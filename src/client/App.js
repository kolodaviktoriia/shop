import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";

const App = () => {
    return (
        <div >
            <Header />
            <Outlet />
            <Footer />
        </div >
    );
};

export default App;