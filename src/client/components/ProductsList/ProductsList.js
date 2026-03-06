import React from 'react';
import ProductItem from '../ProductItem/ProductItem.js';
import * as styles from './ProductsList.module.scss';

const ProductsList = ({ products }) => {
    return (
        <div className={styles.productsList}>
            {products?.map(({ id, title, imageUrl, price }) =>
                (<ProductItem key={id} title={title} imageUrl={imageUrl} price={price} />)
            )}
        </div >
    )
}

export default ProductsList;