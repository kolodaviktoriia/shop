import React from 'react';
import * as styles from './TextareaField.module.scss';

const TextareaField = ({
  label,
  name,
  icon,
  error,
  placeholder,
  className,
  ...props
}) => {
  const classes = `${styles.input} ${className ?? ''}`;
  const inputRender = () => (
    <div>
      <div className={styles.textareaGroup}>
        <textarea
          id={name}
          name={name}
          placeholder=" "
          className={classes}
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

export default TextareaField;
