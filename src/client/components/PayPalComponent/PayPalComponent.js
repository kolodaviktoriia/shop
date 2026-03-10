import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { captureOrderApi, createOrderApi } from "../../api/ordersApi.js";

const PayPalComponent = () => {
    const { currentOrder: order } = useSelector(store => store.orders)

    const initialOptions = {
        currency: "EUR",
        "client-id":
            "Abp1MF1Uw3Ij-dJHA6oqIBRrDWez_2el1hnILz0-J5yZOkYNNxQmL07rbycHkOk45QaH_dE6GnDzfCEY",
        intent: "capture",
        commit: true,
        components: "buttons",
    };

    const [message, setMessage] = useState("");

    const handleCreateOrder = async () => {
        try {
            const orderData = await createOrderApi(order);
            console.log('handleCreateOrde', orderData);

            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
            setMessage(
                `Could not initiate PayPal Checkout...${error}`
            );
        }
    }

    const handleApprove =
        async (data, actions) => {
            try {
                const orderData = await captureOrderApi(data.id);
                console.log('captureOrde', orderData);
                const errorDetail = orderData?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                    return actions.restart();
                } else if (errorDetail) {
                    throw new Error(
                        `${errorDetail.description} (${orderData.debug_id})`
                    );
                } else {
                    const transaction =
                        orderData.purchase_units[0].payments
                            .captures[0];
                    setMessage(
                        `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                    );
                    console.log(
                        "Capture result",
                        orderData,
                        JSON.stringify(orderData, null, 2)
                    );
                }
            } catch (error) {
                console.error(error);
                setMessage(
                    `Sorry, your transaction could not be processed...${error}`
                );
            }
        }


    return (
        <div >
            {typeof window !== 'undefined' && (
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        createOrder={handleCreateOrder}
                        onApprove={handleApprove}
                    />
                </PayPalScriptProvider>
            )}
        </div>
    );
}

export default PayPalComponent;