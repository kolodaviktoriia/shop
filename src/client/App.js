import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header.js";
import * as styles from './App.module.scss';

const App = () => {
    return (
        <div >
            <Header />
            <Outlet />
        </div >
    );
};

export default App;