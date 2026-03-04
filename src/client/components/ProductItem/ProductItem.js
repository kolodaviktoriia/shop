import React from 'react';

import * as styles from './ProductItem.module.scss';

const ProductItem = ({ title, imageUrl }) => {
    return (
        <div className={styles.productItem}>
            <div className={styles.wrapper}>
                <img src={imageUrl} />
            </div >
            <p>{title}</p>
        </div >
    )
}

export default ProductItem