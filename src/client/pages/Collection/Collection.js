import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import SectionHeader from '../../components/SectionHeader/SectionHeader.js';
import Spinner from '../../components/Spinner/Spinner.js';
import SEO from '../../components/SEO.js';
import { clearProducts, fetchProducts } from '../../slices/productsSlice.js';

import * as styles from './Collection.module.scss';

const Collection = () => {
  const { id } = useParams();
  const { products, collections, loading } = useSelector(
    (state) => state.products
  );
  const collection = collections.find((col) => col.name === id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ collection: collection.id }));
    return () => dispatch(clearProducts());
  }, [id, dispatch, collection.id]);

  return (
    <div className={styles.collection}>
      <SEO
        title={collection?.name}
        description={collection?.description}
        image={collection?.imageUrl}
      />
      <WidthWrapper isPadding={false}>
        <SectionHeader
          name={collection?.name}
          imageUrl={collection?.imageUrl}
          description={collection?.description}
          className={id ? styles[id] : ''}
        />
      </WidthWrapper>
      <WidthWrapper>
        {loading ? <Spinner /> : <ProductsList products={products} />}
      </WidthWrapper>
    </div>
  );
};

export default Collection;
