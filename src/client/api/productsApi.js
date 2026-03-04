
const baseUrl = 'http://localhost:3000';

export const getProductsApi = async () => {
    const res = await fetch(baseUrl + '/api/products');
    return res.json();
};

export const getCategoriesApi = async () => {
    const res = await fetch(baseUrl + '/api/categories');
    return res.json();
};