import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './IconButton.module.scss';

const IconButton = ({ to, Icon, label, className = '', onClick, ...props }) => {
  return to ? (
    <Link to={to} className={`${styles.btn}  ${className}`} {...props}>
      {Icon && <Icon className={styles.icon} />}
      {label && <span className={styles.label}>{label}</span>}
    </Link>
  ) : (
    <button
      className={`${styles.btn} ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className={styles.icon} />}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
};

export default IconButton;
