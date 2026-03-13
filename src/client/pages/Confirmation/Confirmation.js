import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
            <Message
                title='Thank You for Your Order!'
                subtitle='Your order has been placed and is now being prepared for shipment.'
                buttonLabel='Continue Shopping'
            />
        </div >
    )
}

export default Confirmation;