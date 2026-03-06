import React from 'react';
import * as styles from './Products.module.scss';
import { useSelector } from 'react-redux';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import { useParams } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader.js';


const allCategory = { name: 'Goodies for Your Glow', description: 'From sweet skincare to magical makeup — everything here is made to boost your glow and brighten your day.', imageUrl: 'https://ikaoenxuuphxuvaiwzex.supabase.co/storage/v1/object/public/images/lipstick.png' };
const Products = () => {
    const { id } = useParams();
    const { products, categories } = useSelector(state => state.products);

    const category =
        categories.find(cat => cat.name === id) ?? allCategory;

    const filteredProducts = id === 'all' ? products : products.filter(product => product.categoryId === category.id);
    return (
        <div className={styles.products}>
            <WidthWrapper>
                <SectionHeader name={category?.name} imageUrl={category?.imageUrl} description={category?.description} />
                <ProductsList products={filteredProducts} />
            </WidthWrapper>
        </div>
    )
}

export default Products;