import React, { useEffect, useState } from 'react';
import * as styles from './Product.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearProduct, fetchProduct } from '../../slices/productsSlice.js';
import { addItemAndSync } from '../../slices/cartSlice.js';
import { displayPrice } from '../../helpers/priceConverters.js';
import AmountField from '../../components/AmountField/AmountField.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import Button from '../../components/Button/Button.js';
import Spinner from '../../components/Spinner/Spinner.js';

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.products);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(fetchProduct(id));
        return () => dispatch(clearProduct())

    }, [id, dispatch]);

    const handleAddToBag = (e) => {
        e.preventDefault();
        dispatch(addItemAndSync({ ...product, quantity }))
        setQuantity(1);
    }

    if (loading || !product) return <Spinner />;

    const { imageUrl, price, description, title, ingredients, categories, collection } = product;

    return (
        <div className={styles.product}>
            <WidthWrapper className={styles.wrapper}>
                <img src={imageUrl} alt={title} />
                <div className={styles.infoWrapper}>
                    <div className={styles.tags}>
                        <span className={styles.tag}>{categories.name}</span>
                        {collection?.name ?
                            <span className={styles.tag}>{collection.name}</span>
                            : undefined}
                    </div>
                    <h2 className={styles.title}>
                        {title}
                    </h2>

                    <h2 className={styles.price}>
                        {displayPrice(price)}
                    </h2>
                    <h3 className={styles.subTitle}>About this product:</h3>
                    <p className={styles.description}>
                        {description}
                    </p>
                    <h3 className={styles.subTitle}>Ingredients:</h3>
                    <p className={styles.description}>
                        {ingredients?.join(', ')}
                    </p>
                    <AmountField className={styles.amount} value={quantity}
                        handleMinus={() => setQuantity(prev => prev - 1)}
                        handlePlus={() => setQuantity(prev => prev + 1)}
                    />
                    <Button onClick={handleAddToBag}>Add to Bag</Button>
                    <Button secondary>Add to Favorite</Button>
                </div>
            </WidthWrapper>
        </div>
    )
}

export default Product;