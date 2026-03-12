import React from 'react';
import * as styles from './LoginGrid.module.scss';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';
import LoginForm from '../LoginForm/LoginForm.js';
import SignupForm from '../SignupForm/SignupForm.js';
import { useSafeOutletContext } from '../../helpers/useSafeOutletContext.js';

const LoginGrid = ({ header }) => {
    const context = useSafeOutletContext();
    const setStep = context?.setStep;

    return (
        <div className={styles.loginGrid}>
            <WidthWrapper>
                <h1 className={styles.title}>{header ?? 'Welcome to Blush & Blossom'}</h1>
            </WidthWrapper>
            <WidthWrapper className={styles.wrapper}>
                <LoginForm onNavigate={setStep} />
                <div className={styles.divider}></div>
                <SignupForm onNavigate={setStep} />
            </WidthWrapper>
        </div>
    )
}

export default LoginGrid;