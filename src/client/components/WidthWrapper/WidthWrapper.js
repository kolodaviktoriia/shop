import React from 'react';
import * as styles from './WidthWrapper.module.scss';

const WidthWrapper = ({ children, className = '' }) => {
    return (
        <div className={`${styles.widthWrapper} ${className}`}>
            {children}
        </div >
    )
}

export default WidthWrapper;