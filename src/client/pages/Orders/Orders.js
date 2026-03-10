import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../slices/ordersSlice.js';

import * as styles from './Orders.module.scss';
import { displayPrice } from '../../helpers/priceConverters.js';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const { orders } = useSelector(store => store.orders);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    const handleClick = (id) => {
        navigate(id);
    }

    return (
        <div className={styles.orders}>
            <h2 className={styles.title}>Your Orders</h2>
            <div className={styles.orderList}>
                {orders?.map(order =>
                    <div className={styles.order} key={order.id} onClick={() => handleClick(order.id)}>
                        <span className={styles.number}>Order: {order.id}</span>
                        <span className={styles.date}>{new Date(order.createdAt).toLocaleDateString('de-DE')}</span>
                        <span className={styles.status}>{order.status}</span>
                        <span className={styles.amount}>{displayPrice(order.totalPrice)}</span>
                    </div>)}
            </div>
        </div >
    )
}

export default Orders;