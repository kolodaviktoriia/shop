import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, HeartIcon, Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import NavLinkCustom from '../NavLinkCustom/NavLinkCustom.js';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';
import InputField from '../InputField/InputField.js';
import Logo from '../Logo/Logo.js';
import * as styles from './Header.module.scss';

const Header = () => {
    const { categories, collections } = useSelector(store => store.products);
    const [isOpen, setIsOpen] = useState(false);
    const { quantity } = useSelector(store => store.cart);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();


    const handleSubmitSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(search)}`);
        setSearch('');

    }
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    return (
        <header className={styles.header}>
            <div className={styles.infoBar}></div>
            <WidthWrapper className={styles.barWrapper}>
                <button className={`${styles.mobileOpen} ${isOpen ? styles.hide : ''}`} onClick={() => setIsOpen(true)}>
                    <Bars3BottomLeftIcon className={styles.icon} />
                </button>
                <form onSubmit={handleSubmitSearch} className={styles.search}>
                    <InputField label='Search' value={search} name='search' onChange={handleSearch} icon={<MagnifyingGlassIcon className={styles.icon} />} />
                </form>
                <Logo />
                <div className={styles.userBar}>
                    <NavLinkCustom to='/profile/details'><UserIcon className={styles.icon} /></NavLinkCustom>
                    <NavLinkCustom to='/profile/favorites'>
                        <HeartIcon className={styles.icon} />
                    </NavLinkCustom>
                    <NavLinkCustom to='/cart'>
                        <ShoppingBagIcon className={styles.icon} />
                        {quantity > 0 ? <div className={styles.quantity}>{quantity}</div> : ''}
                    </NavLinkCustom>
                </div>
            </WidthWrapper>

            <WidthWrapper className={styles.mobileSearch}>
                <form onSubmit={handleSubmitSearch} >
                    <InputField label='Search' value={search} name='search' onChange={handleSearch} icon={<MagnifyingGlassIcon className={styles.icon} />} />
                </form>
            </WidthWrapper>
            <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
                <WidthWrapper className={styles.navWrapper}>
                    <button className={styles.mobileClose} onClick={() => setIsOpen(false)}>
                        <XMarkIcon className={styles.icon} />
                    </button>
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