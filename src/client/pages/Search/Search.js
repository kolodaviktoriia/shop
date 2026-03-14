import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { clearProducts, fetchProducts } from '../../slices/productsSlice.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader.js';
import SEO from '../../components/SEO.js';
import Spinner from '../../components/Spinner/Spinner.js';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import PageWrapper from '../../components/PageWrapper/PageWrapper.js';
import { usePagination } from '../../hooks/pagination.js';

const searchPageContent = {
  resultsFound: {
    title: 'We Found Some Beauty for You!',
    description: 'Here are the products that match your search.',
    extra:
      'Looking for something else? Try another search or explore our collections.',
  },

  noResults: {
    title: 'Oops… Nothing Found',
    description: "We couldn't find any products matching your search.",
    extra: 'Beauty treasures are hiding somewhere… try another search!',
  },
};

const searchImage =
  'https://ikaoenxuuphxuvaiwzex.supabase.co/storage/v1/object/public/images/search.png';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const dispatch = useDispatch();
  const { products, loading, totalPages } = useSelector(
    (state) => state.products
  );
  const page = usePagination(totalPages);

  useEffect(() => {
    dispatch(fetchProducts({ search: query, page, limit: 12 }));

    return () => dispatch(clearProducts());
  }, [page, dispatch, query]);

  const { noResults, resultsFound } = searchPageContent;

  if (loading) return <Spinner />;
  return (
    <PageWrapper>
      <SEO title={`Search For ${searchParams}`} />
      <WidthWrapper isPadding={false}>
        {products.length === 0 ? (
          <SectionHeader
            name={noResults.title}
            imageUrl={searchImage}
            description={noResults?.description}
            extra={noResults?.extra}
          />
        ) : (
          <SectionHeader
            name={resultsFound.title}
            imageUrl={searchImage}
            description={resultsFound?.description}
            extra={resultsFound?.extra}
          />
        )}
      </WidthWrapper>
      <WidthWrapper>
        <ProductsList products={products} totalPages={totalPages} />
      </WidthWrapper>
    </PageWrapper>
  );
};

export default Search;
