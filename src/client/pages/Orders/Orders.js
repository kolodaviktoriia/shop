import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../slices/ordersSlice.js';
import { displayPrice } from '../../helpers/priceConverters.js';
import { usePagination } from '../../hooks/pagination.js';
import Spinner from '../../components/Spinner/Spinner.js';
import PaginationWrapper from '../../components/PaginationWrapper/PaginationWrapper.js';
import * as styles from './Orders.module.scss';
import Message from '../../components/Message/Message.js';

const Orders = () => {
  const { orders, loading, totalPages } = useSelector((store) => store.orders);
  const page = usePagination(totalPages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrders({ page, limit: 6 }));
  }, [dispatch, page]);

  const handleClick = (id) => {
    navigate(id);
  };
  if (loading) return <Spinner />;
  return (
    <div className={styles.orders}>
      <h1 className={styles.title}>Your Orders</h1>
      {!orders || orders.length === 0 ? (
        <Message
          title="Your order history is empty"
          subtitle="Looks like you haven’t placed an order yet. Explore our products and find something you’ll love ✨"
          isPadding={false}
        />
      ) : (
        <PaginationWrapper totalPages={totalPages}>
          <div className={styles.orderList}>
            {orders?.map((order) => (
              <div
                className={styles.order}
                key={order.id}
                onClick={() => handleClick(order.id)}
              >
                <span className={styles.number}>Order: {order.id}</span>
                <span className={styles.date}>
                  {new Date(order.createdAt).toLocaleDateString('de-DE')}
                </span>
                <span className={styles.status}>{order.status}</span>
                <span className={styles.amount}>
                  {displayPrice(order.totalPrice)}
                </span>
              </div>
            ))}
          </div>
        </PaginationWrapper>
      )}
    </div>
  );
};

export default Orders;
