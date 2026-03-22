import { deleteData, getData, postData } from './axiosConfig.js';

export const getProductsApi = (filter) =>
  getData('/products', { params: filter });

export const getProductApi = (id) => getData(`/product/${id}`);

export const reviewProductApi = (review) => postData(`/review`, review);

export const getCategoriesApi = () => getData('/categories');

export const getCollectionsApi = () => getData('/collections');

export const getFavoritesApi = () => getData('/favorites');

export const postFavoritesApi = (id) => postData('/favorites', { id });

export const deleteFavoritesApi = (id) => deleteData(`/favorites/${id}`);

export const getReviewsApi = (id, filter) =>
  getData(`/reviews/${id}`, { params: filter });
