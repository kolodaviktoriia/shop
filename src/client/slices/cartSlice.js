import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        quantity: 0
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
        }
    }
})

export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
