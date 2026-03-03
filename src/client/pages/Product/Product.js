import React from 'react';
import * as styles from './Product.module.scss';
import { useParams } from 'react-router-dom';

const Product = () => {
    const { id } = useParams();
    return (
        <div className={styles.page}>{id}</div>
    )
}

export default Product;