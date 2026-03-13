import React from 'react';

import * as styles from './ProductItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { displayPrice } from '../../helpers/priceConverters.js';

const ProductItem = ({ title, imageUrl, price, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.productItem} onClick={handleClick}>
      <div className={styles.imgWrapper}>
        <img src={imageUrl} alt={title} loading="lazy" />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.price}>{displayPrice(price)}</span>
    </div>
  );
};

export default ProductItem;
