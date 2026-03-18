import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import Spinner from '../../components/Spinner/Spinner.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader.js';
import SEO from '../../components/SEO.js';
import PageWrapper from '../../components/PageWrapper/PageWrapper.js';
import { clearProducts, fetchProducts } from '../../slices/productsSlice.js';
import { LIMIT_PER_PAGE } from '../../constants/pagination.js';
import { usePagination } from '../../hooks/pagination.js';

const allCategory = {
  name: 'Goodies for Your Glow',
  description:
    'From sweet skincare to magical makeup — everything here is made to boost your glow and brighten your day.',
  imageUrl:
    'https://ikaoenxuuphxuvaiwzex.supabase.co/storage/v1/object/public/images/lipstick.png',
};

export const loadProductsByCategoryData = async (store, params) => {
  const state = store.getState();
  let { categories } = state.products;
  const id = params.id;
  const category = categories?.find((cat) => cat.name === id) ?? allCategory;
  const page = Number(params.page || 1);
  await store.dispatch(
    fetchProducts({ category: category?.id, page, limit: LIMIT_PER_PAGE })
  );
};

const Products = () => {
  const { id } = useParams();
  const { products, categories, loading, totalPages, filter } = useSelector(
    (state) => state.products
  );
  const page = usePagination(totalPages);

  const dispatch = useDispatch();

  const category = categories.find((cat) => cat.name === id) ?? allCategory;

  useEffect(() => {
    if (
      !(
        filter &&
        filter.category === category?.id &&
        filter.page === page &&
        filter.limit === LIMIT_PER_PAGE
      )
    ) {
      dispatch(
        fetchProducts({ category: category?.id, page, limit: LIMIT_PER_PAGE })
      );
    }
  }, [id, page, dispatch, category?.id, filter]);

  useEffect(() => {
    return () => {
      dispatch(clearProducts());
    };
  }, [id, dispatch]);

  return (
    <PageWrapper>
      <SEO
        title={category?.name}
        description={category?.description}
        image={category?.imageUrl}
      />
      <WidthWrapper isPadding={false}>
        <SectionHeader
          name={category?.name}
          imageUrl={category?.imageUrl}
          description={category?.description}
        />
      </WidthWrapper>
      <WidthWrapper>
        {loading ? (
          <Spinner />
        ) : (
          <ProductsList products={products} totalPages={totalPages} />
        )}
      </WidthWrapper>
    </PageWrapper>
  );
};

export default Products;
