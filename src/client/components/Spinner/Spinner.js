import React from 'react';
import * as styles from './Spinner.module.scss';

const Spinner = ({ children, className, secondary = false, ...props }) => {
    return (
        <div className={styles.spinnerWrapper}>
            <div className={styles.spinner} />
        </div>
    );
}

export default Spinner;