import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import Spinner from '../../components/Spinner/Spinner.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader.js';
import SEO from '../../components/SEO.js';
import PageWrapper from '../../components/PageWrapper/PageWrapper.js';
import { clearProducts, fetchProducts } from '../../slices/productsSlice.js';
import { usePagination } from '../../hooks/pagination.js';
const allCategory = {
  name: 'Goodies for Your Glow',
  description:
    'From sweet skincare to magical makeup — everything here is made to boost your glow and brighten your day.',
  imageUrl:
    'https://ikaoenxuuphxuvaiwzex.supabase.co/storage/v1/object/public/images/lipstick.png',
};

const Products = () => {
  const { id } = useParams();
  const { products, categories, loading, totalPages } = useSelector(
    (state) => state.products
  );
  const page = usePagination(totalPages);

  const dispatch = useDispatch();

  const category = categories.find((cat) => cat.name === id) ?? allCategory;

  useEffect(() => {
    dispatch(fetchProducts({ category: category.id, page, limit: 12 }));

    return () => dispatch(clearProducts());
  }, [id, page, dispatch, category.id]);

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
