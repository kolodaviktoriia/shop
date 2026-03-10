import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Spinner from "./components/Spinner/Spinner.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./slices/userSlice.js";

const App = () => {
    const { loading } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch])

    if (loading) return <Spinner />;
    return (
        <div >
            <Header />
            <Outlet />
            <Footer />
        </div >
    );
};

export default App;