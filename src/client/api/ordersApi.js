import { getData, postData } from './axiosConfig.js';

export const getOrdersApi = (filter) =>
  getData('/orders', { params: filter });

export const getOrderApi = (id) => getData(`/orders/${id}`);

export const createOrderApi = (order, orderId) =>
  postData('/orders', { order, orderId });

export const captureOrderApi = (orderId) =>
  postData(`/orders/${orderId}/capture`);
