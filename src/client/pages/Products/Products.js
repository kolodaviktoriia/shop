import React from 'react';
import * as styles from './Products.module.scss';
import { useSelector } from 'react-redux';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import { useParams } from 'react-router-dom';

const Products = () => {
    const { id: category } = useParams();
    const { products, categories } = useSelector(state => state.products);
    const categoryId = categories.find(cat => cat.name === category)?.id;
    const filteredProducts = category === 'all' ? products : products.filter(product => product.categoryId === categoryId);
    return (
        <div className={styles.products}>
            <WidthWrapper>
                <ProductsList products={filteredProducts} />
            </WidthWrapper>
        </div>
    )
}

export default Products;