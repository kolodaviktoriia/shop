import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import ProductCartItem from '../../components/ProductCartItem /ProductCartItem.js';
import Spinner from '../../components/Spinner/Spinner.js';
import { displayPrice } from '../../helpers/priceConverters.js';

import { fetchOrder } from '../../slices/ordersSlice.js';

import * as styles from './Order.module.scss';


const Order = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrder(id))
    }, [id])

    const { selectedOrder: order, loading } = useSelector(store => store.orders);

    if (loading || !order?.address) return <Spinner />;
    const { items, totalPrice, itemsPrice, shippingPrice, address } = order;
    const {
        firstName,
        lastName,
        street,
        houseNumber,
        postalCode,
        city,
        country,
        phone
    } = address;

    return (
        <div className={styles.orderWrapper}>
            <WidthWrapper>
                <h2 className={styles.title}>Order: {id}</h2>
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
                </div>
            </WidthWrapper>
        </div >
    )
}

export default Order;