import React from 'react';

import * as styles from './ProductItem.module.scss';

const ProductItem = ({ title, imageUrl, price }) => {

    return (
        <div className={styles.productItem}>
            <div className={styles.imgWrapper}>
                <img src={imageUrl} />
            </div >
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.price}>
                {price} €
            </span>
        </div >
    )
}

export default ProductItem