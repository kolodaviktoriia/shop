import { getData, postData } from "./axiosConfig.js";

export const getOrders = () =>
    getData("/api/orders");


export const createOrderApi = (order) =>
    postData("/api/orders", { order });

export const captureOrderApi = (orderId) =>
    postData(`/api/orders/${orderId}/capture`);

