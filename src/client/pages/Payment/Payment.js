import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Spinner from '../../components/Spinner/Spinner.js';
import PayPalComponent from '../../components/PayPalComponent/PayPalComponent.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import ProductCartItem from '../../components/ProductCartItem /ProductCartItem.js';
import DeliveryAddress from '../../components/DeliveryAddress/DeliveryAddress.js';
import Total from '../../components/Total/Total.js';


import * as styles from './Payment.module.scss';

const Payment = () => {
    const { setStep } = useOutletContext();
    const { items, totalPrice, itemsPrice, shippingPrice, address } = useSelector(store => store.orders?.currentOrder);

    const navigate = useNavigate();

    useEffect(() => {
        if (!items && items.length === 0 || !totalPrice || !address) navigate('/cart');
    }, [items, totalPrice, address, navigate]);


    const handlePayment = (id) => {
        setStep(cur => cur + 1);
        navigate(`/checkout/complete/${id}`);
    }

    if (!address) return <Spinner />;

    return (
        <div className={styles.paymentWrapper}>
            <WidthWrapper>
                <h1 className={styles.title}>Your Order</h1>
            </WidthWrapper>
            <WidthWrapper className={styles.wrapper}>
                <div className={styles.order}>
                    <h2 className={styles.subTitle}>Your shipping details</h2>
                    <DeliveryAddress address={address} />
                    <h2 className={styles.subTitle}>Order summary</h2>
                    <div className={styles.items}>
                        {items?.map((product) =>
                            (<ProductCartItem key={product.id} product={product} isOrder />)
                        )}
                    </div>
                </div>
                <Total subTotal={itemsPrice} shipping={shippingPrice} total={totalPrice}>
                    <PayPalComponent handlePayment={handlePayment} />
                </Total>
            </WidthWrapper>
        </div >
    )
}

export default Payment;