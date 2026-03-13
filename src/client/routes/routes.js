import React from 'react';
import App from "../App.js";
import Landing from "../pages/Landing/Landing.js";
import Product from '../pages/Product/Product.js';
import { fetchCategories, fetchCollections, fetchProduct } from '../slices/productsSlice.js';
import { fetchCurrentUser } from '../slices/userSlice.js';
import Products from '../pages/Products/Products.js';
import Collection from '../pages/Collection/Collection.js';
import Search from '../pages/Search/Search.js';
import Cart from '../pages/Cart/Cart.js';
import Login from '../pages/Login/Login.js';
import Profile from '../pages/Profile/Profile.js';
import Checkout from '../pages/Checkout/Checkout.js';
import Address from '../pages/Address/Address.js';
import Payment from '../pages/Payment/Payment.js';
import Confirmation from '../pages/Confirmation/Confirmation.js';
import ProfileDetails from '../pages/ProfileDetails/ProfileDetails.js';
import Orders from '../pages/Orders/Orders.js';
import Order from '../pages/Order/Order.js';
import Favorites from '../pages/Favorites/Favorites.js';
import NotFound from '../pages/NotFound/NotFound.js';
import ErrorHandler from '../pages/ErrorHandler/ErrorHandler.js';


export const routes = [{
    element: <App />,
    errorElement: <ErrorHandler />,
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
            loadData: (store, params) => store.dispatch(fetchProduct(params.id))
        },
        {
            element: <Products />,
            path: '/products/:id'
        },
        {
            element: <Collection />,
            path: '/collection/:id',

        },
        {
            element: <Search />,
            path: '/search',

        },
        {
            element: <Profile />,
            path: '/profile',
            loadData: (store) => store.dispatch(fetchCurrentUser()),
            children: [
                {
                    element: <ProfileDetails />,
                    path: 'details',

                },
                {
                    element: <Favorites />,
                    path: 'favorites',

                },
                {
                    element: <Orders />,
                    path: 'orders',
                },
                {
                    element: <Order />,
                    path: 'orders/:id',
                },

            ]
        },
        {
            element: <Cart />,
            path: '/cart',

        },
        {
            element: <Login />,
            path: '/login',

        },
        {
            element: <Checkout />,
            path: '/checkout',
            children: [
                {
                    element: <Login />,
                    path: 'login',

                },
                {
                    element: <Address />,
                    path: 'address',

                },
                {
                    element: <Payment />,
                    path: 'payment',

                },
                {
                    element: <Confirmation />,
                    path: 'complete/:id',

                },

            ]

        },
        {
            element: <NotFound />,
            path: '*',
        }
    ]

}]