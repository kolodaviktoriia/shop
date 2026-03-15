import { getData, postData } from './axiosConfig.js';

export const getOrdersApi = (filter) =>
  getData('/api/orders', { params: filter });

export const getOrderApi = (id) => getData(`/api/orders/${id}`);

export const createOrderApi = (order, orderId) =>
  postData('/api/orders', { order, orderId });

export const captureOrderApi = (orderId) =>
  postData(`/api/orders/${orderId}/capture`);
