import React from 'react';

import * as styles from './IconButton.module.scss';

const IconButton = ({ Icon, className = '', ...props }) => {
  return (
    <button className={`${styles.btn}  ${className}`} {...props}>
      {Icon && <Icon className={styles.icon} />}
    </button>
  );
};

export default IconButton;
