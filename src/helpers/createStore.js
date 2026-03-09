import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../client/slices/productsSlice.js";
import { cartReducer } from "../client/slices/cartSlice.js";
import { userReducer } from "../client/slices/userSlice.js";
import { ordersReducer } from "../client/slices/ordersSlice.js";

export const createStore = () => configureStore({ reducer: { products: productsReducer, cart: cartReducer, user: userReducer, orders: ordersReducer } })