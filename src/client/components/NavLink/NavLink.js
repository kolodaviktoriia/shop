import React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './NavLink.module.scss';

const NavLink = ({ to, children }) => {
    return (
        <Link to={to} className={styles.navLink}>{children}</Link>
    )
}

export default NavLink