import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { displayPrice } from '../../helpers/priceConverters.js';

import PayPalComponent from '../../components/PayPalComponent/PayPalComponent.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import ProductCartItem from '../../components/ProductCartItem /ProductCartItem.js';
import * as styles from './Payment.module.scss';

const Payment = () => {
    const { setStep } = useOutletContext();
    const { items, totalPrice, itemsPrice, shippingPrice, address } = useSelector(store => store.orders?.currentOrder);

    const navigate = useNavigate();

    useEffect(() => {
        if (!items && items.length === 0 || !totalPrice || !address) navigate('/cart');
    }, [items, totalPrice, address]);


    const handlePayment = () => {
        setStep(cur => cur + 1)
    }
    if (!address) return <></>;
    const { firstName,
        lastName,
        street,
        houseNumber,
        postalCode,
        city,
        country,
        phone } = address;

    return (
        <div className={styles.paymentWrapper}>
            <WidthWrapper>
                <h2 className={styles.title}>Your Order</h2>
            </WidthWrapper>
            <WidthWrapper className={styles.wrapper}>
                <div className={styles.order}>
                    <h3 className={styles.subTitle}>Your shipping details</h3>
                    <div className={styles.delivery}>
                        <p className={styles.deliveryText}>{firstName} {lastName}</p>
                        <p className={styles.deliveryText}>{street} {houseNumber}</p>
                        <p className={styles.deliveryText}>{postalCode} {city}</p>
                        <p className={styles.deliveryText}>{country}</p>
                        <p className={styles.deliveryText}>{phone}</p>
                    </div>

                    <h3 className={styles.subTitle}>Order summary</h3>
                    <div className={styles.items}>
                        {items?.map((product) =>
                            (<ProductCartItem key={product.id} product={product} isOrder />)
                        )}
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.summaryRow}>
                        <span className={styles.summarySpan}>Subtotal</span>
                        <span className={styles.amount}>{displayPrice(itemsPrice)}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.summarySpan}>Shipping</span>
                        <span className={styles.amount}>{displayPrice(shippingPrice)}</span>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.summaryRow}>
                        <span className={styles.totalTitle}>Total</span>
                        <span className={styles.amount}>{displayPrice(totalPrice)}</span>
                    </div>
                    <PayPalComponent handlePayment={handlePayment} />
                </div>
            </WidthWrapper>
        </div >
    )
}

export default Payment;