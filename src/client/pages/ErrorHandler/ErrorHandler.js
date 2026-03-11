import React from 'react';
import ButtonLink from '../../components/ButtonLink/ButtonLink.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';

import * as styles from './ErrorHandler.module.scss';

const ErrorHandler = () => {
    return (
        <div className={styles.errorHandler}>
            <WidthWrapper className={styles.wrapper}>
                <div className={styles.textWrapper}>
                    <h2 className={styles.title}> 💄 Oops! Beauty Glitch</h2>
                    <p className={styles.subtitle}>
                        Something went wrong in our beauty garden.
                    </p>
                    <ButtonLink to='/' >Back to Blush & Blossom</ButtonLink>
                </div>
            </WidthWrapper>
        </div >
    )
}

export default ErrorHandler;