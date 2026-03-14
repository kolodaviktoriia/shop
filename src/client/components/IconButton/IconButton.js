import React from 'react';

import * as styles from './IconButton.module.scss';

const IconButton = ({ Icon, label, className = '', ...props }) => {
  return (
    <button className={`${styles.btn}  ${className}`} {...props}>
      {Icon && <Icon className={styles.icon} />}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
};

export default IconButton;
