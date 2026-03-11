import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import * as styles from './Checkout.module.scss';

const steps = ['login', 'address', 'payment', 'confirmation'];

const Checkout = () => {
    const [step, setStep] = useState(0);
    const { user } = useSelector(store => store.user);
    const { items } = useSelector(store => store.orders.currentOrder);
    const { id } = useParams();
    const isConfirmation = id && step === 3;
    const navigate = useNavigate();


    useEffect(() => {
        if (step === 0 && user) setStep(cur => cur + 1);
        if (step !== 3) navigate(steps[step]);
        if (!items || items.length === 0 && !isConfirmation) navigate('/cart');
    }, [step, user, navigate, items])

    return (
        <div className={styles.checkout}>
            <WidthWrapper>
                <div className={styles.stepper}>
                    {steps.map((label, index) => (
                        <React.Fragment key={label}>
                            <div className={`${styles.step} ${index === step ? styles.active : ''} ${index < step ? styles.completed : ''}`}>
                                <div
                                    className={styles.circle}
                                >
                                </div>
                                <span className={styles.label}>{label}</span>
                            </div>
                            {index !== steps.length - 1 ? <div className={`${styles.connector}  ${index < step ? styles.completedConnector : ''}`}></div> : undefined}
                        </React.Fragment>
                    ))}
                </div >
                <div className={styles.stepContent}>
                    <Outlet context={{ step, setStep }} />
                </div>

            </WidthWrapper >
        </div >


    )
}

export default Checkout;