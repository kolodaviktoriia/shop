import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader.js';
import { fetchProducts } from '../../slices/productsSlices.js';

import * as styles from './Products.module.scss';


const allCategory = {
    name: 'Goodies for Your Glow',
    description: 'From sweet skincare to magical makeup — everything here is made to boost your glow and brighten your day.',
    imageUrl: 'https://ikaoenxuuphxuvaiwzex.supabase.co/storage/v1/object/public/images/lipstick.png'
};

const Products = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, categories } = useSelector(state => state.products);

    const category =
        categories.find(cat => cat.name === id) ?? allCategory;
    useEffect(() => {
        dispatch(fetchProducts({ category: category.id }));
    }, [id, dispatch]);


    return (
        <div className={styles.products}>
            <WidthWrapper>
                <SectionHeader name={category?.name} imageUrl={category?.imageUrl} description={category?.description} />
                <ProductsList products={products} />
            </WidthWrapper>
        </div>
    )
}

export default Products;