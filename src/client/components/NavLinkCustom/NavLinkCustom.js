import React from 'react';
import { NavLink } from 'react-router-dom';

import * as styles from './NavLinkCustom.module.scss';

const NavLinkCustom = ({ to, children, ...props }) => {
  return (
    <NavLink
      to={to}
      {...props}
      className={({ isActive }) =>
        isActive ? `${styles.navLinkActive} ${styles.navLink}` : styles.navLink
      }
    >
      {children}
    </NavLink>
  );
};

export default NavLinkCustom;
