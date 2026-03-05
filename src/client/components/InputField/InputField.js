import React, { useState } from 'react';
import NavLink from '../NavLink/NavLink.js';
import * as styles from './InputField.module.scss';

const InputField = ({ label, name, icon, ...props }) => {
    const inputRender = () => (
        <div className={styles.inputGroup}>
            <input name={name} placeholder=" " id={name} {...props} />
            <label htmlFor={name} >{label}</label>
        </div>
    )
    return (icon ?
        <div className={styles.inputWrapper}>
            {icon}
            {inputRender()}
        </div> :
        inputRender()

    )
}

export default InputField;