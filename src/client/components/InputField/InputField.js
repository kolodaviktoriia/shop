import React from 'react';
import * as styles from './InputField.module.scss';

const InputField = ({
  label,
  name,
  icon,
  type,
  error,
  placeholder,
  ...props
}) => {
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
      {error && <p className={styles.error}>{error}</p>}
      {placeholder && <p className={styles.placeholder}>{placeholder}</p>}
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
