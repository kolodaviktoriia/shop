import React, { useEffect } from 'react';
import * as styles from './Search.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../../slices/productsSlice.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader.js';
import Spinner from '../../components/Spinner/Spinner.js';



const searchPageContent = {
    resultsFound: {
        title: "We Found Some Beauty for You!",
        description: "Here are the products that match your search.",
        extra:
            "Looking for something else? Try another search or explore our collections."
    },

    noResults: {
        title: "Oops… Nothing Found",
        description: "We couldn't find any products matching your search.",
        extra:
            "Beauty treasures are hiding somewhere… try another search!"
    },
};

const searchImage = 'https://ikaoenxuuphxuvaiwzex.supabase.co/storage/v1/object/public/images/search.png';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const dispatch = useDispatch();
    const { products, loading } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts({ search: query }));
    }, [query, dispatch]);

    const { noResults, resultsFound } = searchPageContent;

    if (loading) return <Spinner />;
    return (
        <div className={styles.search}>
            <WidthWrapper>
                {products.length === 0 ?
                    <SectionHeader name={noResults.title} imageUrl={searchImage} description={noResults?.description} extra={noResults?.extra} /> :
                    <SectionHeader name={resultsFound.title} imageUrl={searchImage} description={resultsFound?.description} extra={resultsFound?.extra} />
                }
                <ProductsList products={products} />
            </WidthWrapper>
        </div>
    )
}

export default Search;