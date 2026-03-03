import React from 'react';
import NavLink from './NavLink.js';

const Header = () => {
    return (
        <header>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/product/123213'>Product</NavLink>
        </header >
    )
}

export default Header