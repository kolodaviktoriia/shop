import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import * as styles from './RatingStars.module.scss';

const RatingStars = ({ rating = 5, max = 5 }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    const isSelected = i <= Math.floor(rating);

    stars.push(
      <StarIcon
        key={i}
        className={`${styles.icon} ${isSelected ? styles.selected : ''}`}
      />
    );
  }

  return <div className={styles.rating}>{stars}</div>;
};

export default RatingStars;
