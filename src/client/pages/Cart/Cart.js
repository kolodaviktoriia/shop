import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import ProductCartItem from '../../components/ProductCartItem /ProductCartItem.js';
import Message from '../../components/Message/Message.js';
import Spinner from '../../components/Spinner/Spinner.js';
import Button from '../../components/Button/Button.js';
import SEO from '../../components/SEO.js';

import Total from '../../components/Total/Total.js';
import { initCurrentOrder } from '../../slices/ordersSlice.js';
import * as styles from './Cart.module.scss';

const Cart = () => {
  const { user } = useSelector((store) => store.user);
  const { items, loading } = useSelector((store) => store.cart);
  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 5000 ? 0 : 1000;
  const totalPrice = itemsPrice + shippingPrice;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(
      initCurrentOrder({
        items,
        totalPrice,
        shippingPrice,
        itemsPrice,
      })
    );
    navigate('/checkout');
  };

  if (loading) return <Spinner />;

  return (
    <div className={styles.cart}>
      <SEO title="Your Bag" />
      {items.length === 0 ? (
        <Message
          title="Your Bag Is Empty"
          subtitle={
            user
              ? 'Nothing here yet? Let’s find something you’ll love!'
              : 'Looking for items you added previously? Then log in to see them!'
          }
          buttonLabel={user ? 'Continue Shopping' : 'Sign in'}
          to={user ? '/' : '/login'}
        />
      ) : (
        <>
          <WidthWrapper>
            <h1 className={styles.title}>Your Shopping Bag</h1>
          </WidthWrapper>
          <WidthWrapper className={styles.wrapper}>
            <div className={styles.items}>
              {items?.map((product) => (
                <ProductCartItem key={product.id} product={product} />
              ))}
            </div>
            <Total
              subTotal={itemsPrice}
              shipping={shippingPrice}
              total={totalPrice}
            >
              <Button className={styles.btn} onClick={handleCheckout}>
                To checkout
              </Button>
              <div className={styles.infoWrapper}>
                <span className={styles.icon}>
                  <ion-icon name="information-circle-outline"></ion-icon>
                </span>
                <span className={styles.info}>
                  Items in the shopping cart are not reserved.
                </span>
              </div>
            </Total>
          </WidthWrapper>
        </>
      )}
    </div>
  );
};

export default Cart;
