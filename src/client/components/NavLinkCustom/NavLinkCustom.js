import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import * as styles from './NavLinkCustom.module.scss';

const NavLinkCustom = ({ to, children }) => {
    return (
        <NavLink to={to} className={styles.navLink}>{children}</NavLink>
    )
}

export default NavLinkCustom;