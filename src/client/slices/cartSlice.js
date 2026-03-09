import { createSlice } from '@reduxjs/toolkit';
import { updateCartApi, getCartApi } from '../api/cartApi.js';

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


const syncCart = (action, payload) => async (dispatch, getState) => {
    const user = getState().user?.user;
    dispatch(action(payload));

    if (user) {
        dispatch(setCartLoading(true));
        dispatch(setCartError(null));
        try {
            const cart = getState().cart.items;
            console.log('cartSync', cart);
            await updateCartApi(cart);
        } catch (err) {
            dispatch(setCartError(err.message));
        } finally {
            dispatch(setCartLoading(false));
        }
    }
};


export const addItemAndSync = (payload) => syncCart(addItem, payload);
export const removeItemAndSync = (payload) => syncCart(removeItem, payload);
export const deleteItemAndSync = (payload) => syncCart(deleteItem, payload);
export const clearCartAndSync = () => syncCart(clearCart);


export const fetchCart = () => async (dispatch, getState) => {
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));

    try {
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

    } catch (err) {
        dispatch(setCartError(err.message));
    } finally {
        dispatch(setCartLoading(false));
    }
};