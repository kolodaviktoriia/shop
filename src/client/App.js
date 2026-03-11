import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Spinner from "./components/Spinner/Spinner.js";
import Toaster from "./components/Toaster/Toaster.js";
import { fetchCurrentUser } from "./slices/userSlice.js";
import * as styles from "./App.module.scss";

const App = () => {
    const { loading } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);

        const hasUserCookie = document.cookie
            .split(";")
            .some(cookie => cookie.trim().startsWith("sb-refresh-token="));

        if (hasUserCookie) dispatch(fetchCurrentUser());
    }, [dispatch]);

    return (
        <div className={styles.appWrapper}>
            <Toaster />
            <Header />

            {loading ? (
                <Spinner />
            ) : (
                <div
                    key={location.pathname}
                    className={`${styles.pageWrapper} ${hydrated ? styles.visible : ""}`}
                >
                    <Outlet />
                </div>
            )}

            <Footer />
        </div>
    );
};

export default App;