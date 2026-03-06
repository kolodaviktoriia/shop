import { createSlice } from '@reduxjs/toolkit';
import { getCategoriesApi, getCollectionsApi, getProductsApi } from '../api/productsApi.js';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        categories: [],
        products: [],
        collections: []
    },
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        },
        setProducts(state, action) {
            state.products = action.payload;
        },
        setCollections(state, action) {
            state.collections = action.payload;
        },
    },
});

export const productsReducer = productsSlice.reducer;


export const fetchProducts = (filter) => async (dispatch) => {
    const data = await getProductsApi(filter);
    dispatch(productsSlice.actions.setProducts(data));
};

export const fetchCategories = () => async (dispatch) => {
    const data = await getCategoriesApi();
    dispatch(productsSlice.actions.setCategories(data));
};

export const fetchCollections = () => async (dispatch) => {
    const data = await getCollectionsApi();
    dispatch(productsSlice.actions.setCollections(data));
};