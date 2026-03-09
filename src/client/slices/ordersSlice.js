import { createSlice } from '@reduxjs/toolkit';
import { updateCartApi, getCartApi } from '../api/cartApi.js';

const initialOrder = {
    address: null,
    totalPrice: null,
    shippingPrice: null,
    itemsPrice: null,
    items: [],
}
const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        selectedOrder: {},
        currentOrder: initialOrder,
        loading: false,
        error: ''
    },
    reducers: {
        addAddress: (state, action) => {
            state.currentOrder.address = action.payload;
        },
        initCurrentOrder: (state, action) => {
            state.currentOrder.items = action.payload.items;
            state.currentOrder.itemsPrice = action.payload.itemsPrice;
            state.currentOrder.shippingPrice = action.payload.shippingPrice;
            state.currentOrder.totalPrice = action.payload.totalPrice;

        },
        clearCurrentOrder: (state, action) => {
            state.currentOrder = initialOrder;
        },
        setSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload.selectedOrder;
        },
        setOrders: (state, action) => {
            state.orders = action.payload.orders;
        },
        setOrderLoading: (state, action) => {
            state.loading = action.payload;
        },
        setOrderError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const { addAddress, initCurrentOrder, clearCurrentOrder, setSelectedOrder, setOrders, setOrderLoading, setOrderError } = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;

