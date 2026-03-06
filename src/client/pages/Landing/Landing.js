import React from 'react';
import * as styles from './Landing.module.scss';
import { useSelector } from 'react-redux';
import Hero from '../../components/Hero/Hero.js';
import Categories from '../../components/Categories/Categories.js';
import Collections from '../../components/Collections/Collections.js';

const Landing = () => {
    const { products } = useSelector(state => state.products)
    return (
        <div className={styles.landing}>
            <Hero />
            <Categories />
            <Collections />
        </div>
    )
}

export default Landing;