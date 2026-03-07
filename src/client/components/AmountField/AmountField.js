import React from 'react';
import * as styles from './AmountField.module.scss';

const AmountField = ({ handleMinus, handlePlus, value, className }) => {
    return (
        <div className={`${styles.amountField} ${className}`}>
            <button onClick={handleMinus} className={styles.btn} disabled={value <= 1}><ion-icon name="remove-outline"></ion-icon></button>
            <span className={styles.value}>{value}</span>
            <button onClick={handlePlus} className={styles.btn}><ion-icon name="add-outline"></ion-icon></button>
        </div >)

}

export default AmountField;