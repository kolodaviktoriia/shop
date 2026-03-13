import { createSlice } from '@reduxjs/toolkit';
import {
  deleteFavoritesApi,
  getCategoriesApi,
  getCollectionsApi,
  getFavoritesApi,
  getProductApi,
  getProductsApi,
  postFavoritesApi,
} from '../api/productsApi.js';
import { notify } from '../components/Toaster/Toaster.js';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    product: undefined,
    categories: [],
    products: [],
    collections: [],
    loading: false,
    error: null,
    favorites: [],
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
    clearProducts(state) {
      state.products = [];
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
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
  },
});

export const {
  clearProduct,
  clearProducts,
  setProducts,
  setProduct,
  setCategories,
  setCollections,
  setProductsLoading,
  setProductsError,
  setFavorites,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;

export const fetchFavorites = (isUpdate) => async (dispatch) => {
  if (isUpdate) {
    try {
      const { favorites } = await getFavoritesApi();
      dispatch(setFavorites(favorites));
    } catch (err) {
      notify.error(err?.response?.data?.message || err.message);
    }
  } else {
    dispatch(setProductsLoading(true));
    dispatch(setProductsError(null));
    try {
      const { favorites } = await getFavoritesApi();
      dispatch(setFavorites(favorites));
    } catch (err) {
      dispatch(setProductsError(err?.response?.data?.message || err.message));
    } finally {
      dispatch(setProductsLoading(false));
    }
  }
};

export const addFavorite = (id) => async (dispatch) => {
  try {
    await postFavoritesApi(id);
    dispatch(fetchFavorites(true));
    notify.success('This product is now one of your favorites 💕');
  } catch (err) {
    notify.error(err?.response?.data?.message || err.message);
  }
};

export const removeFavorite = (id) => async (dispatch) => {
  try {
    await deleteFavoritesApi(id);

    dispatch(fetchFavorites(true));
    notify.success('Removed from your favorites ✨');
  } catch (err) {
    notify.error(err?.response?.data?.message || err.message);
  }
};

export const fetchProducts = (filter) => async (dispatch) => {
  dispatch(setProductsLoading(true));
  dispatch(setProductsError(null));

  try {
    const data = await getProductsApi(filter);
    dispatch(setProducts(data));
  } catch (err) {
    notify.error(err?.response?.data?.message || err.message);
    dispatch(setProductsError(err?.response?.data?.message || err.message));
  } finally {
    dispatch(setProductsLoading(false));
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  dispatch(setProductsLoading(true));
  dispatch(setProductsError(null));

  try {
    const data = await getProductApi(id);
    dispatch(setProduct(data));
  } catch (err) {
    notify.error(err?.response?.data?.message || err.message);
    dispatch(setProductsError(err?.response?.data?.message || err.message));
  } finally {
    dispatch(setProductsLoading(false));
  }
};

export const fetchCategories = () => async (dispatch) => {
  const data = await getCategoriesApi();
  dispatch(setCategories(data));
};

export const fetchCollections = () => async (dispatch) => {
  const data = await getCollectionsApi();
  dispatch(setCollections(data));
};
