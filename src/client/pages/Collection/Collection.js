import React from 'react';
import * as styles from './Collection.module.scss';
import { useSelector } from 'react-redux';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import { useParams } from 'react-router-dom';

const Collection = () => {
    const { id: collection } = useParams();
    const { products, collections } = useSelector(state => state.products);
    const collectionId = collections.find(col => col.name === collection)?.id;
    const filteredProducts = products.filter(product => product.collectionId === collectionId);

    return (
        <div className={styles.collection}>
            <WidthWrapper>
                <ProductsList products={filteredProducts} />
            </WidthWrapper>
        </div>
    )
}

export default Collection;