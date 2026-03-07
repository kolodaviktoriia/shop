import React from 'react';

import * as styles from './Button.module.scss';

const Button = ({ children, secondary = false, ...props }) => {
    return (
        <button className={secondary ? styles.btnSecondary : styles.btn} {...props}>{children}</button>
    )
}

export default Button;