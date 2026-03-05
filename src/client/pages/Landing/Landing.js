import React from 'react';
import * as styles from './Landing.module.scss';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem/ProductItem.js';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import Hero from '../../components/Hero/Hero.js';

const Landing = () => {
    const { products } = useSelector(state => state.products)
    return (
        <div className={styles.landing}>
            <Hero />
            <ProductsList products={products} />
        </div>
    )
}

export default Landing;