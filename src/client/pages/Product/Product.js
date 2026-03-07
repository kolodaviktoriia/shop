import React, { useEffect } from 'react';
import * as styles from './Product.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearProduct, fetchProduct } from '../../slices/productsSlices.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import Button from '../../components/Button/Button.js';

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProduct(id));

        return () => dispatch(clearProduct())

    }, [id, dispatch]);

    if (!product) return <div></div>;
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
                        {price} €
                    </h2>
                    <h3 className={styles.subTitle}>About this product:</h3>
                    <p className={styles.description}>
                        {description}
                    </p>
                    <h3 className={styles.subTitle}>Ingredients:</h3>
                    <p className={styles.description}>
                        {ingredients?.join(', ')}
                    </p>

                    <Button>Add to Bag</Button>

                    <Button secondary>Add to Favorite</Button>
                </div>
            </WidthWrapper>
        </div>
    )
}

export default Product;