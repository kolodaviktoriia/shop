import React from 'react';
import * as styles from './Collection.module.scss';
import { useSelector } from 'react-redux';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import { useParams } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader.js';

const Collection = () => {
    const { id } = useParams();
    const { products, collections } = useSelector(state => state.products);
    const collection = collections.find(col => col.name === id);
    const filteredProducts = products.filter(product => product.collectionId === collection.id);

    return (
        <div className={styles.collection}>
            <WidthWrapper>
                <SectionHeader name={collection?.name} imageUrl={collection?.imageUrl} description={collection?.description} className={styles[collection.name]} />
                <ProductsList products={filteredProducts} />
            </WidthWrapper>
        </div>
    )
}

export default Collection;