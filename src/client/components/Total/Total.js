import React from 'react';
import { displayPrice } from '../../helpers/priceConverters.js';

import * as styles from './Total.module.scss';

const Total = ({ total, subTotal, shipping, children }) => {
  return (
    <div className={styles.details}>
      <div className={styles.summaryRow}>
        <span className={styles.summarySpan}>Subtotal</span>
        <span className={styles.amount}>{displayPrice(subTotal)}</span>
      </div>
      <div className={styles.summaryRow}>
        <span className={styles.summarySpan}>Shipping</span>
        <span className={styles.amount}>{displayPrice(shipping)}</span>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.summaryRow}>
        <span className={styles.totalTitle}>Total</span>
        <span className={styles.amount}>{displayPrice(total)}</span>
      </div>
      {children}
    </div>
  );
};

export default Total;
