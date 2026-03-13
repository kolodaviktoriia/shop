import { getData, postData } from './axiosConfig.js';

export const getCartApi = () => getData('/api/cart');

export const updateCartApi = (items) => postData('/api/cart', { items });
