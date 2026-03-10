import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ButtonLink from '../../components/ButtonLink/ButtonLink.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import { clearCartAndSync } from '../../slices/cartSlice.js';
import { clearCurrentOrder } from '../../slices/ordersSlice.js';

import * as styles from './Confirmation.module.scss';

const Confirmation = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearCartAndSync());
        dispatch(clearCurrentOrder());
    }, [])
    return (
        <div className={styles.confirmation}>
            <WidthWrapper className={styles.wrapper}>
                <div className={styles.congratulation}>
                    <h2 className={styles.title}>Thank You for Your Order!</h2>
                    <p className={styles.subtitle}>Your order has been placed and is now being prepared for shipment.</p>
                    <ButtonLink to='/' >Continue Shopping</ButtonLink>
                </div>
            </WidthWrapper>
        </div >
    )
}

export default Confirmation;