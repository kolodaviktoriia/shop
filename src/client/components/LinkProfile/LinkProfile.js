import React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './LinkProfile.module.scss';

const LinkProfile = ({ to, children, className }) => {
  const linkClasses = `${styles.linkProfile} ${className ?? ''}`;
  return (
    <Link to={to} className={linkClasses}>
      {children}
    </Link>
  );
};

export default LinkProfile;
