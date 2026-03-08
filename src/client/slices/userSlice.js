import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUserApi, loginApi, logoutApi, signupApi } from '../api/usersApi.js';

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


export const loginUser = (email, password) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
        const data = await loginApi(email, password);
        dispatch(setUser(data.user));
    } catch (err) {
        dispatch(setError(err.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const logoutUser = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await logoutApi();
        dispatch(clearUser());
    } catch (err) {
        dispatch(setError(err.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchCurrentUser = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await getCurrentUserApi();
        dispatch(setUser(data.user || null));
    } catch (err) {
        dispatch(setError(err.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const signupUser = (userData) => async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
        const data = await signupApi(userData);
        dispatch(setUser(data.user || null));
    } catch (err) {
        dispatch(setError(err.message));
    } finally {
        dispatch(setLoading(false));
    }
};