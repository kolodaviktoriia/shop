import React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './LinkProfile.module.scss';

const LinkProfile = ({ to, children, className, onClick }) => {
  const linkClasses = `${styles.linkProfile} ${className ?? ''}`;
  return onClick ? (
    <button className={linkClasses} onClick={onClick}>
      {children}
    </button>
  ) : (
    <Link to={to} className={linkClasses}>
      {children}
    </Link>
  );
};

export default LinkProfile;
