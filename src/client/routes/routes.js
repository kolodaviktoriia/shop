import React from 'react';
import App from "../App.js";
import Landing from "../pages/Landing/Landing.js";
import Product from '../pages/Product/Product.js';
import { fetchCategories, fetchCollections, fetchProducts } from '../slices/productsSlices.js';
import Products from '../pages/Products/Products.js';
import Collection from '../pages/Collection/Collection.js';


export const routes = [{
    element: <App />,
    path: '/',
    loadData: (store) => Promise.all([
        store.dispatch(fetchCategories()),
        store.dispatch(fetchCollections()),
    ]),
    children: [
        {
            element: <Landing />,
            path: '/',
            exact: true
        },

        {
            element: <Product />,
            path: '/product/:id',
        },

        {
            element: <Products />,
            path: '/products/:id'
        },
        {
            element: <Collection />,
            path: '/collection/:id',

        },
    ]

}]