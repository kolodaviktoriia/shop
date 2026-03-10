import React from 'react';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import * as styles from './Confirmation.module.scss';
import ButtonLink from '../../components/ButtonLink/ButtonLink.js';

const Confirmation = () => {
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