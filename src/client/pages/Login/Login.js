import React from 'react';
import * as styles from './Login.module.scss';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import LoginForm from '../../components/LoginForm/LoginForm.js';
import SignupForm from '../../components/SignupForm/SignupForm.js';

const Login = () => {
    return (
        <div className={styles.login}>
            <WidthWrapper>
                <h2 className={styles.title}>Welcome to Blush & Blossom</h2>
            </WidthWrapper>
            <WidthWrapper className={styles.wrapper}>
                <LoginForm />
                <div className={styles.divider}></div>
                <SignupForm />
            </WidthWrapper>
        </div>
    )
}

export default Login;