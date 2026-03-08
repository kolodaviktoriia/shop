import React from 'react';
import * as styles from './LoginGrid.module.scss';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';
import LoginForm from '../LoginForm/LoginForm.js';
import SignupForm from '../SignupForm/SignupForm.js';

const LoginGrid = ({ header }) => {
    return (
        <div className={styles.loginGrid}>
            <WidthWrapper>
                <h2 className={styles.title}>{header ?? 'Welcome to Blush & Blossom'}</h2>
            </WidthWrapper>
            <WidthWrapper className={styles.wrapper}>
                <LoginForm />
                <div className={styles.divider}></div>
                <SignupForm />
            </WidthWrapper>
        </div>
    )
}

export default LoginGrid;