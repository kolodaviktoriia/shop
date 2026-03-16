import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './IconButton.module.scss';

const IconButton = ({
  to,
  Icon,
  label,
  className = '',
  iconClassName = '',
  onClick,
  ...props
}) => {
  const iconClasses = `${styles.icon}  ${iconClassName}`;
  const btnClasses = `${styles.btn}  ${className}`;
  return to ? (
    <Link to={to} className={btnClasses} {...props}>
      {Icon && <Icon className={iconClasses} />}
      {label && <span className={styles.label}>{label}</span>}
    </Link>
  ) : (
    <button className={btnClasses} onClick={onClick} {...props}>
      {Icon && <Icon className={iconClasses} />}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
};

export default IconButton;
