import React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './ButtonLink.module.scss';

const ButtonLink = ({ to, children, isLink }) => {
  return isLink ? (
    <Link to={to} className={styles.buttonLink}>
      {children}
    </Link>
  ) : (
    <a href={to} className={styles.buttonLink}>
      {children}
    </a>
  );
};

export default ButtonLink;
