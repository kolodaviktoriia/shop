import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StarIcon } from '@heroicons/react/24/solid';
import { fetchProduct } from '../../slices/productsSlice.js';
import { reviewProductApi } from '../../api/productsApi.js';
import Button from '../../components/Button/Button.js';
import { notify } from '../../components/Toaster/Toaster.js';
import IconButton from '../../components/IconButton/IconButton.js';
import TextareaField from '../../components/TextareaField/TextareaField.js';
import * as styles from './Review.module.scss';

const Review = () => {
  const { id: orderId, productId } = useParams();
  const { product } = useSelector((store) => store.products);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [productId, dispatch]);

  const handleRating = (e, rating) => {
    e.preventDefault();
    setRating(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }
    try {
      await reviewProductApi({ orderId, productId, rating, comment });
      navigate(`/product/${productId}`);
    } catch (err) {
      notify.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.review}>
      <h1 className={styles.title}>Review for {product?.title}</h1>
      <form className={styles.form} noValidate>
        <div className={styles.rating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <IconButton
              key={star}
              Icon={StarIcon}
              onClick={(e) => handleRating(e, star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              iconClassName={`${styles.icon} ${
                (hoverRating || rating) >= star ? styles.selected : ''
              }`}
            />
          ))}
        </div>

        <TextareaField
          label="Comment"
          name="comment"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          error={error}
        />

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Leave Review'}
        </Button>
      </form>
    </div>
  );
};

export default Review;
