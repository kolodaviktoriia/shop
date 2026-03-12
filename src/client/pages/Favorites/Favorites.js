import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import Spinner from '../../components/Spinner/Spinner.js';
import { fetchFavorites } from '../../slices/productsSlice.js';



const Favorites = () => {
    const dispatch = useDispatch();
    const { favorites, loading } = useSelector(state => state.products);


    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);


    return (
        <WidthWrapper>
            {loading ? <Spinner /> : <ProductsList products={favorites} />}
        </WidthWrapper>
    )
}

export default Favorites;