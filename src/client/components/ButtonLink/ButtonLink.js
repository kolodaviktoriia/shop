import React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './ButtonLink.module.scss';

const ButtonLink = ({ to, children, isLink, className }) => {
  const linkClasses = `${styles.buttonLink} ${className ?? ''}`;
  return isLink ? (
    <Link to={to} className={linkClasses}>
      {children}
    </Link>
  ) : (
    <a href={to} className={linkClasses}>
      {children}
    </a>
  );
};

export default ButtonLink;
