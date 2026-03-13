import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as styles from './Collections.module.scss';

const Collections = () => {
  const { collections } = useSelector((store) => store.products);
  const navigate = useNavigate();
  const handleClick = (collection) => {
    navigate(`/collection/${collection}`);
  };
  return (
    <div className={styles.collections}>
      {collections?.map(({ imageUrl, id, name, description }) => (
        <div
          className={styles.collection}
          key={id}
          onClick={() => handleClick(name)}
        >
          <img key={id} src={imageUrl} />
          <div className={styles.textWrapper}>
            <h2 className={styles.title}>{name}</h2>
            <h3 className={styles.description}>{description}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collections;
