import { createSlice } from '@reduxjs/toolkit';
import { getCategoriesApi, getCollectionsApi, getProductApi, getProductsApi } from '../api/productsApi.js';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        product: undefined,
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
        setProduct(state, action) {
            state.product = action.payload;
        },
        clearProduct(state) {
            state.product = undefined;
        },
        setCollections(state, action) {
            state.collections = action.payload;
        },
    },
});

export const { clearProduct, setProducts, setProduct, setCategories, setCollections } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;


export const fetchProducts = (filter) => async (dispatch) => {
    const data = await getProductsApi(filter);
    dispatch(setProducts(data));
};

export const fetchProduct = (id) => async (dispatch) => {
    const data = await getProductApi(id);
    dispatch(setProduct(data));
};

export const fetchCategories = () => async (dispatch) => {
    const data = await getCategoriesApi();
    dispatch(setCategories(data));
};

export const fetchCollections = () => async (dispatch) => {
    const data = await getCollectionsApi();
    dispatch(setCollections(data));
};