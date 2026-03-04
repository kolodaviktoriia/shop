import React from 'react';
import * as styles from './Landing.module.scss';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem/ProductItem.js';

const Landing = () => {
    const { products } = useSelector(state => state.products)
    return (
        <div className={styles.landing}>
            {products?.map(({ id, title, imageUrl }) =>
                (<ProductItem key={id} title={title} imageUrl={imageUrl} />)
            )}
        </div>
    )
}

export default Landing;