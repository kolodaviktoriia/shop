import React from 'react';
import * as styles from './AmountField.module.scss';

const AmountField = ({
  handleMinus,
  handlePlus,
  handleDelete,
  value,
  className,
  small = false,
}) => {
  const isDelete = handleDelete && value === 1;
  return (
    <div
      className={`${styles.amountField} ${small ? styles.smallField : ''} ${className} `}
    >
      {isDelete ? (
        <button onClick={handleDelete} className={styles.btn}>
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      ) : (
        <button
          onClick={handleMinus}
          className={styles.btn}
          disabled={value <= 1}
        >
          <ion-icon name="remove-outline"></ion-icon>
        </button>
      )}
      <span className={styles.value}>{value}</span>
      <button onClick={handlePlus} className={styles.btn}>
        <ion-icon name="add-outline"></ion-icon>
      </button>
    </div>
  );
};

export default AmountField;
