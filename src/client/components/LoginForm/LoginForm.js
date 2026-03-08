import React, { useState } from 'react';
import InputField from '../InputField/InputField.js';
import * as styles from './LoginForm.module.scss';
import Button from '../Button/Button.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice.js';

const LoginForm = ({ navigateTo }) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const validate = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!validate()) return;
        dispatch(loginUser(email, password));
        navigate(navigateTo ?? '/profile')

    }

    return (
        <div className={styles.loginWrapper}>
            <h2 className={styles.title}>I am already a Blush & Blossom customer</h2>
            <form className={styles.loginForm} noValidate>
                <InputField label='Email address' name='email' type='email' value={email} error={errors.email} onChange={(e) => setEmail(e.target.value)} />
                <InputField label='Password' name='password' type='password' value={password} error={errors.password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Login</Button>
            </form>
        </div>

    )
}

export default LoginForm;