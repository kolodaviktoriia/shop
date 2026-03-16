import { deleteData, getData, postData } from './axiosConfig.js';

export const getProductsApi = (filter) =>
  getData('/api/products', { params: filter });

export const getProductApi = (id) => getData(`/api/product/${id}`);

export const reviewProductApi = (review) => postData(`/api/review`, review);

export const getCategoriesApi = () => getData('/api/categories');

export const getCollectionsApi = () => getData('/api/collections');

export const getFavoritesApi = () => getData('/api/favorites');

export const postFavoritesApi = (id) => postData('/api/favorites', { id });

export const deleteFavoritesApi = (id) => deleteData(`/api/favorites/${id}`);

export const getReviewsApi = (id, filter) =>
  getData(`/api/reviews/${id}`, { params: filter });
