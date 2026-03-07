import axios from "axios";

const baseUrl =
    typeof window !== 'undefined'
        ? ''
        : process.env.BASE_URL || 'http://localhost:3000';

export const getProductsApi = async (filter) => {
    const res = await axios.get(baseUrl + '/api/products', { params: filter });
    return res.data;
};

export const getProductApi = async (id) => {
    const res = await axios.get(baseUrl + `/api/product/${id}`);
    return res.data;
};

export const getCategoriesApi = async () => {
    const res = await axios.get(baseUrl + '/api/categories');
    return res.data;
};

export const getCollectionsApi = async () => {
    const res = await axios.get(baseUrl + '/api/collections');
    return res.data;
};