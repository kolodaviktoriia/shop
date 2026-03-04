import { createSlice } from '@reduxjs/toolkit';

import { getCategoriesApi, getProductsApi } from '../api/productsApi.js';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        categories: [],
        products: [],
    },
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;
        },
        setProducts(state, action) {
            state.products = action.payload;
        },
    },
});

export const productsReducer = productsSlice.reducer;


export const fetchProducts = () => async (dispatch) => {
    const data = await getProductsApi();
    dispatch(productsSlice.actions.setProducts(data));
};

export const fetchCategories = () => async (dispatch) => {
    const data = await getCategoriesApi();
    dispatch(productsSlice.actions.setCategories(data));
};