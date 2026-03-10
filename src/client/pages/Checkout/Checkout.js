import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as styles from './Checkout.module.scss';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import { Outlet, useNavigate } from 'react-router-dom';

const steps = ['login', 'address', 'payment', 'confirmation'];

const Checkout = () => {
    const [step, setStep] = useState(0);
    const { user } = useSelector(store => store.user);
    const { items, address } = useSelector(store => store.orders.currentOrder);

    const navigate = useNavigate();
    useEffect(() => {
        if (step === 0 && user) setStep(cur => cur + 1);
        navigate(steps[step])
        if (!items || items.length === 0) navigate('/cart');
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