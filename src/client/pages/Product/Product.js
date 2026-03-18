import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  addFavorite,
  clearProduct,
  fetchProduct,
  removeFavorite,
} from '../../slices/productsSlice.js';
import { addItemAndSync } from '../../slices/cartSlice.js';
import { displayPrice } from '../../helpers/priceConverters.js';
import { formatDateToString } from '../../helpers/dateHelper.js';
import { getReviewsApi } from '../../api/productsApi.js';
import RatingStars from '../../components/RatingStars/RatingStars.js';
import PaginationStateWrapper from '../../components/PaginationStateWrapper/PaginationStateWrapper.js';
import AmountField from '../../components/AmountField/AmountField.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import Button from '../../components/Button/Button.js';
import Spinner from '../../components/Spinner/Spinner.js';
import SEO, { productSchema } from '../../components/SEO.js';

import * as styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const { product, loading, favorites } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!product || product.id !== id) {
      dispatch(fetchProduct(id));
    }
  }, [id, product, dispatch]);

  useEffect(() => {
    return () => dispatch(clearProduct());
  }, [dispatch]);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoadingReviews(true);
      try {
        const { reviews: dataReviews = [] } = await getReviewsApi(id, {
          page,
          limit: 6,
        });
        setReviews(dataReviews);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [id, page]);

  const {
    imageUrl = 'https://ikaoenxuuphxuvaiwzex.supabase.co/storage/v1/object/public/images/placeholder.png',
    price = 0,
    description = 'No description available',
    title = 'Product',
    ingredients = [],
    categories = { name: '\u00A0' },
    collection = null,
    reviewCount,
    averageRating,
  } = product || {};

  const favoriteId =
    favorites?.find((fav) => fav.id === id)?.favoriteId ?? null;

  const handleAddToBag = (e) => {
    e.preventDefault();
    dispatch(
      addItemAndSync(
        { ...product, quantity },
        'Great choice! Added to your cart 🛍️'
      )
    );
    setQuantity(1);
  };

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    dispatch(addFavorite(product.id));
  };

  const handleRemoveFromFavorite = (e) => {
    e.preventDefault();
    dispatch(removeFavorite(favoriteId));
  };

  return (
    <div className={styles.product}>
      <SEO
        type="product"
        title={title}
        description={description}
        image={imageUrl}
        schema={productSchema({
          title,
          description,
          image: imageUrl,
          price: price / 100,
        })}
      />
      {loading && !product ? (
        <WidthWrapper className={styles.skeletonWrapper}>
          <Spinner />
        </WidthWrapper>
      ) : (
        <WidthWrapper className={styles.wrapper}>
          <img src={imageUrl} alt={`${title} product image`} />

          <div className={styles.infoWrapper}>
            <div className={styles.tags}>
              <span className={styles.tag}>{categories?.name}</span>
              {collection?.name && (
                <span className={styles.tag}>{collection?.name}</span>
              )}
            </div>
            <h1 className={styles.title}>{title}</h1>
            <h2 className={styles.price}>{displayPrice(price)}</h2>
            <h3 className={styles.subTitle}>About this product:</h3>
            <p className={styles.description}>{description}</p>
            <h3 className={styles.subTitle}>Ingredients:</h3>
            <p className={styles.description}>{ingredients?.join(', ')}</p>
            <AmountField
              className={styles.amount}
              value={quantity}
              handleMinus={() => setQuantity((prev) => prev - 1)}
              handlePlus={() => setQuantity((prev) => prev + 1)}
            />
            <Button onClick={handleAddToBag}>Add to Bag</Button>
            {user ? (
              favoriteId ? (
                <Button secondary onClick={handleRemoveFromFavorite}>
                  Remove from Favorite
                </Button>
              ) : (
                <Button secondary onClick={handleAddToFavorite}>
                  Add to Favorite
                </Button>
              )
            ) : (
              <div className={styles.placeholder} />
            )}
          </div>
          {loadingReviews ? (
            <Spinner />
          ) : reviews.length > 0 ? (
            <div className={styles.reviewsWrapper}>
              <h1 className={styles.title}>Reviews</h1>
              <div className={styles.rating}>
                <RatingStars rating={averageRating} />
                <span className={styles.ratingTitle}>
                  {averageRating} ({reviewCount})
                </span>
              </div>
              <PaginationStateWrapper
                totalPages={Math.ceil(reviewCount / 6)}
                page={page}
                setPage={setPage}
              >
                <div className={styles.reviews}>
                  {reviews.map(({ rating, comment, createdAt, id }) => (
                    <div className={styles.review} key={id}>
                      <div className={styles.header}>
                        <div className={styles.rating}>
                          <RatingStars rating={rating} />
                        </div>
                        <span className={styles.date}>
                          {formatDateToString(createdAt)}
                        </span>
                      </div>
                      {comment && <p className={styles.comment}>{comment}</p>}
                    </div>
                  ))}
                </div>
              </PaginationStateWrapper>
            </div>
          ) : (
            ''
          )}
        </WidthWrapper>
      )}
    </div>
  );
};

export default Product;
