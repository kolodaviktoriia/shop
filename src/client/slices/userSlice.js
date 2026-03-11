import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUserApi, loginApi, logoutApi, signupApi } from '../api/usersApi.js';
import { clearCart, fetchCart } from './cartSlice.js';
import { notify } from '../components/Toaster/Toaster.js';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        setUser: (state, action) => { state.user = action.payload; },
        setLoading: (state, action) => { state.loading = action.payload; },
        setError: (state, action) => { state.error = action.payload; },
        clearUser: (state) => { state.user = null; state.error = null; }
    }
});

export const { setUser, setLoading, setError, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;


export const loginUser = (email, password, isCheckout = false) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
        const data = await loginApi(email, password);
        dispatch(setUser(data.user));
        dispatch(fetchCart(isCheckout));
    } catch (err) {
        notify.error(err?.response?.data?.message || err.message);
        dispatch(setError(err?.response?.data?.message || err.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const logoutUser = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await logoutApi();
        dispatch(clearUser());
        dispatch(clearCart());
    } catch (err) {
        notify.error(err?.response?.data?.message || err.message);
        dispatch(setError(err?.response?.data?.message || err.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchCurrentUser = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getCurrentUserApi();
        dispatch(setUser(data.user || null));
        dispatch(fetchCart());
    } catch (err) {
        notify.error(err?.response?.data?.message || err.message);
        dispatch(setError(err?.response?.data?.message || err.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const signupUser = (userData, isCheckout = false) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
        const data = await signupApi(userData);
        dispatch(setUser(data.user || null));
        dispatch(fetchCart(isCheckout));
    } catch (err) {
        notify.error(err?.response?.data?.message || err.message);
        dispatch(setError(err?.response?.data?.message || err.message));
    } finally {
        dispatch(setLoading(false));
    }
};