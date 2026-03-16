import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AmountField from '../AmountField/AmountField.js';
import {
  addItemAndSync,
  deleteItemAndSync,
  removeItemAndSync,
} from '../../slices/cartSlice.js';
import { displayPrice } from '../../helpers/priceConverters.js';
import ButtonLink from '../ButtonLink/ButtonLink.js';
import * as styles from './ProductCartItem.module.scss';

const ProductCartItem = ({ product, orderId, isOrder = false }) => {
  const { title, imageUrl, price, id, quantity } = product;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };
  const handleDelete = () => {
    dispatch(deleteItemAndSync({ ...product }));
  };
  const handleMinus = () => {
    dispatch(removeItemAndSync({ ...product }));
  };
  const handlePlus = () => {
    dispatch(addItemAndSync({ ...product, quantity: 1 }));
  };

  return (
    <div className={styles.productCartItem}>
      <div className={styles.imgWrapper} onClick={handleClick}>
        <img src={imageUrl} alt={title} />
      </div>
      <div className={styles.detailsWrapper}>
        <div className={styles.textWrapper}>
          <h3 className={styles.title}>{title}</h3>
          {isOrder ? (
            <span className={styles.price}>
              {quantity} x {displayPrice(price)}
            </span>
          ) : (
            ''
          )}
          <span className={styles.mainPrice}>
            {displayPrice(quantity * price)}
          </span>
        </div>
        {isOrder ? (
          orderId ? (
            <ButtonLink
              to={`/profile/orders/${orderId}/review/${product.id}`}
              className={styles.btn}
            >
              Leave Review
            </ButtonLink>
          ) : (
            ''
          )
        ) : (
          <AmountField
            value={quantity}
            handleMinus={handleMinus}
            handlePlus={handlePlus}
            handleDelete={handleDelete}
            small
            className={styles.amount}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCartItem;
