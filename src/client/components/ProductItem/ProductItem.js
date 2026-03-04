import React from 'react';

import * as styles from './ProductItem.module.scss';

const ProductItem = ({ title, imageUrl }) => {
    return (
        <div className={styles.productItem}>
            <img src={imageUrl} />
            <p>{title}</p>
        </div >
    )
}

export default ProductItem