import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import ProductCartItem from '../../components/ProductCartItem /ProductCartItem.js';
import ButtonLink from '../../components/ButtonLink/ButtonLink.js';

import Button from '../../components/Button/Button.js';

import { initCurrentOrder } from '../../slices/ordersSlice.js';
import { displayPrice } from '../../helpers/priceConverters.js';

import * as styles from './Cart.module.scss';

const Cart = () => {
    const { user } = useSelector(store => store.user)
    const { items } = useSelector(store => store.cart);
    const itemsPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shippingPrice = itemsPrice > 5000 ? 0 : 1000;
    const totalPrice = itemsPrice + shippingPrice;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCheckout = () => {
        dispatch(initCurrentOrder({
            items,
            totalPrice,
            shippingPrice,
            itemsPrice,
        }));
        navigate('/checkout');
    }
    return (
        <div className={styles.cart}>
            {items.length === 0 ?
                <WidthWrapper className={styles.emptyWrapper}>
                    <div className={styles.emptyCart}>
                        <h2 className={styles.title}>Your Bag Is Empty</h2>
                        {user ? <>
                            <p className={styles.subtitle}>Nothing here yet? Let’s find something you’ll love!</p>
                            <ButtonLink to='/' >Continue Shopping</ButtonLink>
                        </> : <>
                            <p className={styles.subtitle}>Looking for items you added previously? Then log in to see them!</p>
                            <ButtonLink to='/login' >Sign in</ButtonLink>
                        </>
                        }
                    </div>
                </WidthWrapper> : <>
                    <WidthWrapper>
                        <h2 className={styles.title}>Your Shopping Bag</h2>
                    </WidthWrapper>
                    <WidthWrapper className={styles.wrapper}>
                        <div className={styles.items}>
                            {items?.map((product) =>
                                (<ProductCartItem key={product.id} product={product} />)
                            )}
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
                            <Button className={styles.btn} onClick={handleCheckout}>Continue to checkout</Button>
                            <div className={styles.infoWrapper}> <span className={styles.icon} ><ion-icon name="information-circle-outline"></ion-icon></span>
                                <span className={styles.info}>
                                    Items in the shopping cart are not reserved.
                                </span>
                            </div>
                        </div>
                    </WidthWrapper >
                </>}
        </div >
    )
}

export default Cart;