import React from 'react';
import * as styles from './InputField.module.scss';

const InputField = ({ label, name, icon, type, error, ...props }) => {
  const inputRender = () => (
    <div>
      <div className={styles.inputGroup}>
        <input
          name={name}
          placeholder=" "
          id={name}
          type={type ?? 'text'}
          {...props}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
  return icon ? (
    <div className={styles.inputWrapper}>
      {icon}
      {inputRender()}
    </div>
  ) : (
    inputRender()
  );
};

export default InputField;
