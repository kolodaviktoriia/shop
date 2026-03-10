import { createSlice } from '@reduxjs/toolkit';
import { getOrderApi, getOrdersApi } from '../api/ordersApi.js';

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
            state.selectedOrder = action.payload;
        },
        setOrders: (state, action) => {
            state.orders = action.payload;
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

export const fetchOrders = () => async (dispatch) => {
    dispatch(setOrderLoading(true));
    dispatch(setOrderError(null));

    try {
        const data = await getOrdersApi();

        dispatch(setOrders(data.orders));
    }
    catch (err) {
        dispatch(setOrderError(err.message));
    } finally {
        dispatch(setOrderLoading(false));
    };
};

export const fetchOrder = (id) => async (dispatch) => {
    dispatch(setOrderLoading(true));
    dispatch(setOrderError(null));

    try {
        const data = await getOrderApi(id);
        dispatch(setSelectedOrder(data.order));
    }
    catch (err) {
        dispatch(setOrderError(err.message));
    } finally {
        dispatch(setOrderLoading(false));
    };
};
