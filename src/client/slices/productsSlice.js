import { createSlice } from '@reduxjs/toolkit';
import { getCategoriesApi, getCollectionsApi, getProductApi, getProductsApi } from '../api/productsApi.js';
import { notify } from '../components/Toaster/Toaster.js';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        product: undefined,
        categories: [],
        products: [],
        collections: [],
        loading: false,
        error: null
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
        setProductsLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProductsError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { clearProduct, setProducts, setProduct, setCategories, setCollections, setProductsLoading, setProductsError } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;

export const fetchProducts = (filter) => async (dispatch) => {
    dispatch(setProductsLoading(true));
    dispatch(setProductsError(null));

    try {
        const data = await getProductsApi(filter);
        dispatch(setProducts(data));
    }
    catch (err) {
        notify.error(err?.response.data?.message || err.message);
        dispatch(setProductsError(err?.response.data?.message || err.message));
    } finally {
        dispatch(setProductsLoading(false));
    };
};

export const fetchProduct = (id) => async (dispatch) => {
    dispatch(setProductsLoading(true));
    dispatch(setProductsError(null));

    try {
        const data = await getProductApi(id);
        dispatch(setProduct(data));
    }
    catch (err) {
        notify.error(err?.response.data?.message || err.message);
        dispatch(setProductsError(err?.response.data?.message || err.message));
    } finally {
        dispatch(setProductsLoading(false));
    };
};


export const fetchCategories = () => async (dispatch) => {
    const data = await getCategoriesApi();
    dispatch(setCategories(data));
};

export const fetchCollections = () => async (dispatch) => {
    const data = await getCollectionsApi();
    dispatch(setCollections(data));
};