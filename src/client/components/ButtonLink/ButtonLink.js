import React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './ButtonLink.module.scss';

const ButtonLink = ({ to, children }) => {
    return (
        <Link to={to} className={styles.buttonLink}>{children}</Link>
    )
}

export default ButtonLink