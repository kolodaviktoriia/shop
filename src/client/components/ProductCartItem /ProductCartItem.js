import React from 'react';

import * as styles from './ProductCartItem.module.scss';
import { useNavigate } from 'react-router-dom';
import AmountField from '../AmountField/AmountField.js';
import { useDispatch } from 'react-redux';
import { addItemAndSync, deleteItemAndSync, removeItemAndSync } from '../../slices/cartSlice.js';

const ProductCartItem = ({ product }) => {
    const { title, imageUrl, price, id, quantity } = product;
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleClick = () => {
        navigate(`/product/${id}`)
    }
    const handleDelete = () => {
        dispatch(deleteItemAndSync({ ...product }));
    }
    const handleMinus = () => {
        dispatch(removeItemAndSync({ ...product }));
    }
    const handlePlus = () => {
        dispatch(addItemAndSync({ ...product, quantity: 1 }));
    }

    return (
        <div className={styles.productCartItem} >
            <div className={styles.imgWrapper} onClick={handleClick}>
                <img src={imageUrl} alt={title} />
            </div >
            <div className={styles.textWrapper}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.price}>
                    {(quantity * price).toFixed(2)} €
                </span>
            </div>
            <AmountField value={quantity} handleMinus={handleMinus} handlePlus={handlePlus} handleDelete={handleDelete} small className={styles.amount} />
        </div >
    )
}

export default ProductCartItem;