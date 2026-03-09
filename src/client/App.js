import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./slices/userSlice.js";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch])

    return (
        <div >
            <Header />
            <Outlet />
            <Footer />
        </div >
    );
};

export default App;