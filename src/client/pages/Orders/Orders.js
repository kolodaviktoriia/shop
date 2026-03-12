import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../slices/ordersSlice.js';
import { displayPrice } from '../../helpers/priceConverters.js';
import Spinner from '../../components/Spinner/Spinner.js';

import * as styles from './Orders.module.scss';

const Orders = () => {
    const { orders, loading } = useSelector(store => store.orders);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    const handleClick = (id) => {
        navigate(id);
    }
    if (loading) return <Spinner />;
    return (
        <div className={styles.orders}>
            <h1 className={styles.title}>Your Orders</h1>
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