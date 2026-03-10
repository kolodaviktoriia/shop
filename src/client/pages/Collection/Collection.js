import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader.js';
import { fetchProducts } from '../../slices/productsSlice.js';

import * as styles from './Collection.module.scss';
import Spinner from '../../components/Spinner/Spinner.js';

const Collection = () => {
    const { id } = useParams();
    const { products, collections, loading } = useSelector(state => state.products);
    const collection = collections.find(col => col.name === id);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts({ collection: collection.id }));
    }, [id, dispatch]);

    if (loading) return <Spinner />;
    return (
        <div className={styles.collection}>
            <WidthWrapper>
                <SectionHeader name={collection?.name} imageUrl={collection?.imageUrl} description={collection?.description} className={id ? styles[id] : ''} />
                <ProductsList products={products} />
            </WidthWrapper>
        </div>
    )
}

export default Collection;