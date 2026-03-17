import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../slices/productsSlice.js';
import ProductsList from '../../components/ProductsList/ProductsList.js';
import Spinner from '../../components/Spinner/Spinner.js';
import Message from '../../components/Message/Message.js';

import * as styles from './Favorites.module.scss';

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className={styles.favorites}>
      <h1 className={styles.title}>Your Favorites</h1>
      {loading ? (
        <Spinner />
      ) : !favorites || favorites.length === 0 ? (
        <Message
          title="Your favorites list is empty"
          subtitle="Start exploring and add your first beauty picks 💗"
          isPadding={false}
        />
      ) : (
        <ProductsList products={favorites} />
      )}
    </div>
  );
};

export default Favorites;
