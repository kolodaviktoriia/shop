import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader.js';
import Spinner from '../../components/Spinner/Spinner.js';
import SEO from '../../components/SEO.js';
import PageWrapper from '../../components/PageWrapper/PageWrapper.js'
import { clearProducts, fetchProducts } from '../../slices/productsSlice.js';

import { usePagination } from '../../hooks/pagination.js';
import * as styles from './Collection.module.scss';;

const Collection = () => {
  const { id } = useParams();
  const { products, collections, loading, totalPages } = useSelector(
    (state) => state.products
  );

  const page = usePagination(totalPages);

  const collection = collections.find((col) => col.name === id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ collection: collection.id, page, limit: 12 }));
    return () => dispatch(clearProducts());
  }, [id, dispatch, page, collection?.id]);

  return (
    <PageWrapper>
      <SEO
        title={collection?.name}
        description={collection?.description}
        image={collection?.imageUrl}
      />
      <WidthWrapper isPadding={false} className={styles.collection}>
        <SectionHeader
          name={collection?.name}
          imageUrl={collection?.imageUrl}
          description={collection?.description}
          className={id ? styles[id] : ''}
        />
      </WidthWrapper>
      <WidthWrapper>
        {loading ? <Spinner /> : <ProductsList products={products} totalPages={totalPages} />}
      </WidthWrapper>
    </PageWrapper >
  );
};

export default Collection;
