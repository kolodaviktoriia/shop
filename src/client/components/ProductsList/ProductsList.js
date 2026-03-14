import React from 'react';
import ProductItem from '../ProductItem/ProductItem.js';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper.js';
import * as styles from './ProductsList.module.scss';

const ProductsList = ({ products, totalPages }) => {
  return (
    <PaginationWrapper totalPages={totalPages}>
      <div className={styles.productsList}>
        {products &&
          products?.map(({ id, title, imageUrl, price }) => (
            <ProductItem
              key={id}
              title={title}
              imageUrl={imageUrl}
              id={id}
              price={price}
            />
          ))}
      </div>
    </PaginationWrapper>
  );
};

export default ProductsList;
