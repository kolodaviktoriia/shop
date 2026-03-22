import { getData, postData } from './axiosConfig.js';

export const getCartApi = () => getData('/cart');

export const updateCartApi = (items) => postData('/cart', { items });
