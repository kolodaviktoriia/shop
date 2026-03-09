import React from 'react';
import { useSelector } from 'react-redux';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import ProductCartItem from '../../components/ProductCartItem /ProductCartItem.js';
import ButtonLink from '../../components/ButtonLink/ButtonLink.js';

import Button from '../../components/Button/Button.js';
import { useNavigate } from 'react-router-dom';

import * as styles from './Cart.module.scss';

const Cart = () => {
    const { items } = useSelector(store => store.cart);
    const subtotal = items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 10;
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');

    }
    return (
        <div className={styles.cart}>
            {items.length === 0 ?
                <WidthWrapper className={styles.emptyWrapper}>
                    <div className={styles.emptyCart}>
                        <h2 className={styles.title}>Your Bag Is Empty</h2>
                        <p className={styles.subtitle}>Looking for items you added previously? Then log in to see them!</p>
                        <ButtonLink to='/login' >Sign in</ButtonLink>
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
                                <span className={styles.amount}>{subtotal} €</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span className={styles.summarySpan}>Shipping</span>
                                <span className={styles.amount}>{shipping} €</span>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.summaryRow}>
                                <span className={styles.totalTitle}>Total</span>
                                <span className={styles.amount}>{(subtotal + shipping).toFixed(2)} €</span>
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