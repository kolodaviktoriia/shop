import React from 'react';
import App from "../App.js";
import Landing from "../pages/Landing/Landing.js";
import Product from '../pages/Product/Product.js';

export const routes = [{
    element: <App />,
    path: '/',
    children: [
        {
            element: <Landing />,
            path: '/',
            exact: true
        },
        {
            element: <Product />,
            path: '/product/:id',
            exact: true
        }
    ]

}]