import React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './LinkSecondary.module.scss';

const LinkSecondary = ({ to, children, isIcon = false }) => {
  return (
    <Link to={to} className={isIcon ? styles.iconLink : styles.link}>
      {children}
    </Link>
  );
};

export default LinkSecondary;
