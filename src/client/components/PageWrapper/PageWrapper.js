import React from 'react';
import * as styles from './PageWrapper.module.scss';

const PageWrapper = ({ children }) => {
  return <div className={styles.pageWrapper}>{children}</div>;
};

export default PageWrapper;
