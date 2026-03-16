import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '../../slices/ordersSlice.js';
import DeliveryAddress from '../../components/DeliveryAddress/DeliveryAddress.js';
import PayPalComponent from '../../components/PayPalComponent/PayPalComponent.js';
import ProductCartItem from '../../components/ProductCartItem /ProductCartItem.js';
import Spinner from '../../components/Spinner/Spinner.js';
import Total from '../../components/Total/Total.js';
import BackButton from '../../components/BackButton/BackButton.js';
import * as styles from './Order.module.scss';

const Order = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [id, dispatch]);

  const { selectedOrder: order, loading } = useSelector(
    (store) => store.orders
  );

  if (loading || !order?.address) return <Spinner />;
  const {
    items,
    totalPrice,
    itemsPrice,
    shippingPrice,
    address,
    billingAddress,
    status,
  } = order;

  const handlePayment = (id) => {
    dispatch(fetchOrder(id));
  };

  return (
    <div className={styles.orderWrapper}>
      <h1 className={styles.title}>Order: {id}</h1>
      <div className={styles.wrapper}>
        <div className={styles.order}>
          <h2 className={styles.subTitle}>Status: {status}</h2>
          {address && (
            <>
              <h2 className={styles.subTitle}>Your shipping details</h2>
              <DeliveryAddress address={address} />
            </>
          )}
          {billingAddress && (
            <>
              <h2 className={styles.subTitle}>Your billing details</h2>
              <DeliveryAddress address={billingAddress} />
            </>
          )}
          <h3 className={styles.subTitle}>Order summary</h3>
          <div className={styles.items}>
            {items?.map((product) => (
              <ProductCartItem
                key={product.id}
                product={product}
                isOrder
                orderId={id}
              />
            ))}
          </div>
        </div>
        <Total
          subTotal={itemsPrice}
          shipping={shippingPrice}
          total={totalPrice}
        >
          {status === 'pending' && (
            <PayPalComponent handlePayment={handlePayment} orderId={id} />
          )}
        </Total>
      </div>
      <BackButton
        className={styles.btn}
        to="/profile/orders"
        label="Back To Orders"
      />
    </div>
  );
};

export default Order;
