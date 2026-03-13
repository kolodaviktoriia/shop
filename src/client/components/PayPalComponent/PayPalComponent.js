import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { captureOrderApi, createOrderApi } from '../../api/ordersApi.js';
import { notify } from '../Toaster/Toaster.js';

const PayPalComponent = ({ handlePayment }) => {
  const { currentOrder: order } = useSelector((store) => store.orders);

  const initialOptions = {
    currency: 'EUR',
    'client-id':
      'Ab7GY2KlVbm8FkhbnscnFM5v3evrZLQj4L2ZRw6xwbHRfq8KDDHTbsQ0WKBreHosn--hrHti1F5CgOb3',
    intent: 'capture',
    commit: true,
    components: 'buttons',
  };

  const handleCreateOrder = async () => {
    try {
      const orderData = await createOrderApi(order);

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
      notify.error(`Could not initiate PayPal Checkout...${error}`);
    }
  };

  const handleApprove = async (data, actions) => {
    try {
      const orderData = await captureOrderApi(data.orderID);
      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        handlePayment(orderData.orderId);
      }
    } catch (error) {
      console.error(error);
      notify.error(`Sorry, your transaction could not be processed...${error}`);
    }
  };

  return (
    <div>
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
};

export default PayPalComponent;
