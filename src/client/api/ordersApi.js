import { getData, postData } from './axiosConfig.js';

export const getOrdersApi = () => getData('/api/orders');

export const getOrderApi = (id) => getData(`/api/orders/${id}`);

export const createOrderApi = (order) => postData('/api/orders', { order });

export const captureOrderApi = (orderId) =>
  postData(`/api/orders/${orderId}/capture`);
