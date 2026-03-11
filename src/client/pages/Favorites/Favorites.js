import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import Spinner from '../../components/Spinner/Spinner.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader.js';
import { fetchFavorites } from '../../slices/productsSlice.js';

import * as styles from './Favorites.module.scss';


const Favorites = () => {
    const dispatch = useDispatch();
    const { favorites, loading } = useSelector(state => state.products);


    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);


    return (
        <div className={styles.products}>
            <WidthWrapper>
                {loading ? <Spinner /> : <ProductsList products={favorites} />}
            </WidthWrapper>
        </div>
    )
}

export default Favorites;