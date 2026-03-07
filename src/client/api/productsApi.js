import { getData } from "./axiosConfig.js";


export const getProductsApi = (filter) =>
    getData("/api/products", { params: filter });

export const getProductApi = (id) =>
    getData(`/api/product/${id}`);

export const getCategoriesApi = () =>
    getData("/api/categories");

export const getCollectionsApi = () =>
    getData("/api/collections");