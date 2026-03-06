import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './Logo.module.scss';

const Logo = ({ className }) => <Link to='/' className={`${styles.logo} ${className}`}>Blush & Blossom</Link>


export default Logo;