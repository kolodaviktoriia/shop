import React from 'react';
import ButtonLink from '../../components/ButtonLink/ButtonLink.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';

import * as styles from './NotFound.module.scss';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <WidthWrapper className={styles.wrapper}>
                <div className={styles.textWrapper}>
                    <h2 className={styles.title}> 🌸 Oops! Blossom Missed!</h2>
                    <p className={styles.subtitle}>
                        The page you’re looking for got lost in our garden of blush and blooms.<br />
                        Don’t worry, your beauty journey continues from here!
                    </p>
                    <ButtonLink to='/' >Continue Shopping</ButtonLink>
                </div>
            </WidthWrapper>
        </div >
    )
}

export default NotFound;