import { createSlice } from '@reduxjs/toolkit';
import { updateCartApi, getCartApi } from '../api/cartApi.js';
import { notify } from '../components/Toaster/Toaster.js';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        quantity: 0,
        loading: false,
        error: null
    },
    reducers: {
        addItem: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload })
            }
            state.quantity += action.payload.quantity;
        },
        removeItem: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity--;
                state.quantity--;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== action.payload.id);
                }
            }
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload.id);
            state.quantity = state.items.reduce((acc, cur) => acc + cur.quantity, 0);
        },
        clearCart: (state, action) => {
            state.items = [];
            state.quantity = 0;
        },
        setCart: (state, action) => {
            state.items = action.payload;
            state.quantity = state.items.reduce((acc, cur) => acc + cur.quantity, 0);
        },
        setCartLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCartError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const { addItem, removeItem, deleteItem, clearCart, setCartLoading,
    setCartError, setCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;


const syncCart = (action, payload, successMessage = '') => async (dispatch, getState) => {
    const user = getState().user?.user;
    dispatch(action(payload));

    if (user) {
        const cart = getState().cart.items;
        await updateCartApi(cart);
        if (successMessage) {
            notify.success(successMessage);
        }
    }
};


export const addItemAndSync = (payload, successMessage = '') => syncCart(addItem, payload, successMessage);
export const removeItemAndSync = (payload) => syncCart(removeItem, payload);
export const deleteItemAndSync = (payload) => syncCart(deleteItem, payload);
export const clearCartAndSync = () => syncCart(clearCart);


export const fetchCart = (isCheckout = false) => async (dispatch, getState) => {
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));

    try {
        if (isCheckout) {
            const cart = getState().cart.items;
            await updateCartApi(cart);
        } else {
            const { items } = await getCartApi();
            const cart = getState().cart.items;
            const newCart = [...items];

            cart?.forEach(item => {
                const exists = newCart.find(i => i.id === item.id);
                if (exists) {
                    exists.quantity += item.quantity;
                } else {
                    newCart.push(item);
                }
            });
            dispatch(setCart(newCart));
            await updateCartApi(newCart);
        }
    } catch (err) {
        notify.error(err?.response?.data?.message || err.message);
        dispatch(setCartError(err?.response?.data?.message || err.message));
    } finally {
        console.log('final');
        dispatch(setCartLoading(false));
    }
};