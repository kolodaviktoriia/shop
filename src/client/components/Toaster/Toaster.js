import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as styles from './Toaster.module.scss';


export const notify = {
    success: (message) => {
        if (typeof window !== "undefined") {
            toast.success(message);
        }
    },

    error: (message) => {
        if (typeof window !== "undefined") {
            toast.error(message);
        }
    },

    info: (message) => {
        if (typeof window !== "undefined") {
            toast.info(message);
        }
    }
};

const Toaster = () => {

    return (
        <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            newestOnTop
            className={styles.toastContainer}
            toastClassName={styles.toast}
            bodyClassName={styles.body}
            progressClassName={styles.progress}
        />
    );
};

export default Toaster;