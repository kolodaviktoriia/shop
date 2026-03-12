import React from 'react';
import * as styles from './WidthWrapper.module.scss';

const WidthWrapper = ({ children, isPadding = true, className = '' }) => {
    return (
        <div className={`${styles.widthWrapper} ${isPadding ? styles.padding : ''} ${className}`}>
            {children}
        </div >
    )
}

export default WidthWrapper;