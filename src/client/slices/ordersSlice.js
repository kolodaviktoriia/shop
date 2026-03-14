import { createSlice } from '@reduxjs/toolkit';
import { getOrderApi, getOrdersApi } from '../api/ordersApi.js';
import { notify } from '../components/Toaster/Toaster.js';

const initialOrder = {
  address: null,
  totalPrice: null,
  shippingPrice: null,
  itemsPrice: null,
  items: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    selectedOrder: {},
    currentOrder: initialOrder,
    loading: false,
    error: '',
    totalPages: 1,
    total: 0,
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
    clearCurrentOrder: (state) => {
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
    setPagination(state, action) {
      state.totalPages = action.payload.totalPages;
      state.total = action.payload.total;
    },
  },
});

export const {
  addAddress,
  initCurrentOrder,
  clearCurrentOrder,
  setSelectedOrder,
  setOrders,
  setOrderLoading,
  setOrderError,
  setPagination,
} = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;

export const fetchOrders =
  (filter = {}) =>
  async (dispatch) => {
    dispatch(setOrderLoading(true));
    dispatch(setOrderError(null));

    try {
      const data = await getOrdersApi(filter);
      dispatch(setOrders(data.orders ?? []));
      dispatch(
        setPagination({
          totalPages: data.totalPages,
          total: data.total,
        })
      );
    } catch (err) {
      notify.error(err?.response?.data?.message || err.message);
      dispatch(setOrderError(err?.response.data?.message || err.message));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };

export const fetchOrder = (id) => async (dispatch) => {
  dispatch(setOrderLoading(true));
  dispatch(setOrderError(null));

  try {
    const data = await getOrderApi(id);
    dispatch(setSelectedOrder(data.order));
  } catch (err) {
    notify.error(err?.response?.data?.message || err.message);
    dispatch(setOrderError(err?.response.data?.message || err.message));
  } finally {
    dispatch(setOrderLoading(false));
  }
};
