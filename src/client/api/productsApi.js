const baseUrl =
    typeof window !== 'undefined'
        ? ''
        : process.env.BASE_URL || 'http://localhost:3000';

export const getProductsApi = async () => {
    const res = await fetch(baseUrl + '/api/products');
    return res.json();
};

export const getCategoriesApi = async () => {
    const res = await fetch(baseUrl + '/api/categories');
    return res.json();
};

export const getCollectionsApi = async () => {
    const res = await fetch(baseUrl + '/api/collections');
    return res.json();
};