import React from 'react';
import * as styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Spinner;
