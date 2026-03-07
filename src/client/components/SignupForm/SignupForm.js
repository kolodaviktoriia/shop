import React, { useState } from 'react';
import InputField from '../InputField/InputField.js';
import * as styles from './SignupForm.module.scss';
import Button from '../Button/Button.js';
import { useNavigate } from 'react-router-dom';


const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
};

const SignupForm = ({ navigateTo }) => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        let valid = true;
        const newErrors = {};

        if (!formValues.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (!formValues.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formValues.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }
        if (!formValues.firstName) newErrors.firstName = 'First name is required';
        if (!formValues.lastName) newErrors.lastName = 'Last name is required';

        setErrors(newErrors);
        return valid;

    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!validate()) return;
        navigate(navigateTo ?? '/profile')

    }

    return (
        <div className={styles.signupWrapper}>
            <h2 className={styles.title}>I am new to Blush & Blossom</h2>
            <form className={styles.loginForm} noValidate>
                <InputField label='First Name' name='firstName' type='text' value={formValues.firstName} error={errors.firstName} onChange={handleChange} />
                <InputField label='Last Name' name='lastName' type='text' value={formValues.lastName} error={errors.lastName} onChange={handleChange} />
                <InputField label='Email address' name='email' type='email' value={formValues.email} error={errors.email} onChange={handleChange} />
                <InputField label='Password' name='password' type='password' value={formValues.password} error={errors.password} onChange={handleChange} />
                <Button onClick={handleLogin}>Create Account</Button>
            </form>
        </div>

    )
}

export default SignupForm;