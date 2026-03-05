import React, { useState } from 'react';
import NavLink from '../NavLink/NavLink.js';
import * as styles from './Header.module.scss';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';
import { useSelector } from 'react-redux';
import { MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, HeartIcon } from '@heroicons/react/24/outline';
import InputField from '../InputField/InputField.js';

const Header = () => {
    const { categories } = useSelector(store => store.products);
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    return (
        <header className={styles.header}>
            <div className={styles.infoBar}></div>
            <WidthWrapper className={styles.barWrapper}>
                <InputField label='Search' value={search} name='search' onChange={handleSearch} icon={<MagnifyingGlassIcon className={styles.icon} />} />
                <h2 className={styles.logo}>Blush & Blossom</h2>
                <div className={styles.userBar}>
                    <NavLink to='/user'><UserIcon className={styles.icon} /></NavLink>
                    <NavLink to='/favorites'><HeartIcon className={styles.icon} /></NavLink>
                    <NavLink to='/cart'><ShoppingBagIcon className={styles.icon} /></NavLink>
                </div>
            </WidthWrapper>
            <nav className={styles.nav}>
                <WidthWrapper className={styles.navWrapper}>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/products/all'>All</NavLink>
                    {categories.map(category => <NavLink to={`/products/${category.name}`} key={category.id}>{category.name}</NavLink>)}
                </WidthWrapper>
            </nav>

        </header >
    )
}

export default Header;