import React from 'react';

import * as styles from './Button.module.scss';

const Button = ({ children, className, secondary = false, ...props }) => {
  return (
    <button
      className={`${secondary ? styles.btnSecondary : styles.btn} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
