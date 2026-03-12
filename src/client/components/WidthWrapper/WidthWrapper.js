import React from 'react';
import * as styles from './WidthWrapper.module.scss';

const WidthWrapper = ({ children, isLeftPadding = true, isRightPadding = true, isPadding = true, className = '' }) => {
    return (
        <div className={`${styles.widthWrapper} 
        ${isPadding ? styles.padding : ''} 
         ${isLeftPadding ? styles.leftPadding : ''} 
         ${isRightPadding ? styles.rightPadding : ''} 
         ${className}`}>
            {children}
        </div >
    )
}

export default WidthWrapper;