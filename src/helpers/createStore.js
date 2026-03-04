import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "../client/slices/productsSlices.js";

export const createStore = () => configureStore({ reducer: { products: productsReducer } })