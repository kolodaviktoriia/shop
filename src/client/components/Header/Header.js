import React, { useState } from 'react';
import NavLinkCustom from '../NavLinkCustom/NavLinkCustom.js';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';
import { useSelector } from 'react-redux';
import { MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, HeartIcon } from '@heroicons/react/24/outline';
import InputField from '../InputField/InputField.js';
import Logo from '../Logo/Logo.js';
import * as styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { categories, collections } = useSelector(store => store.products);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();


    const handleSubmitSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(search)}`);

    }
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    return (
        <header className={styles.header}>
            <div className={styles.infoBar}></div>
            <WidthWrapper className={styles.barWrapper}>
                <form onSubmit={handleSubmitSearch}>
                    <InputField label='Search' value={search} name='search' onChange={handleSearch} icon={<MagnifyingGlassIcon className={styles.icon} />} />
                </form>
                <Logo />
                <div className={styles.userBar}>
                    <NavLinkCustom to='/user'><UserIcon className={styles.icon} /></NavLinkCustom>
                    <NavLinkCustom to='/favorites'><HeartIcon className={styles.icon} /></NavLinkCustom>
                    <NavLinkCustom to='/cart'><ShoppingBagIcon className={styles.icon} /></NavLinkCustom>
                </div>
            </WidthWrapper>
            <nav className={styles.nav}>
                <WidthWrapper className={styles.navWrapper}>
                    <NavLinkCustom to='/'>Home</NavLinkCustom>
                    <NavLinkCustom to='/products/all'>All</NavLinkCustom>
                    {categories.map(category => <NavLinkCustom to={`/products/${category.name}`} key={category.id}>{category.name}</NavLinkCustom>)}
                    {collections.map(collection => <NavLinkCustom to={`/collection/${collection.name}`} key={collection.id}>{collection.name}</NavLinkCustom>)}
                </WidthWrapper>
            </nav>

        </header >
    )
}

export default Header;