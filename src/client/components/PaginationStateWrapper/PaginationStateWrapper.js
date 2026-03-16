import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import * as styles from './PaginationStateWrapper.module.scss';
import IconButton from '../IconButton/IconButton.js';

const PaginationStateWrapper = ({ children, totalPages, page, setPage }) => {
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handleBack = () => {
    setPage((prev) => prev - 1);
  };

  return !totalPages || totalPages === 1 ? (
    <>{children}</>
  ) : (
    <div className={styles.pagination}>
      {children}
      <div className={styles.navigation}>
        <IconButton
          className={page === 1 ? styles.hide : ''}
          onClick={handleBack}
          Icon={ChevronLeftIcon}
        />
        <span className={styles.page}>
          Page {page} of {totalPages}
        </span>
        <IconButton
          className={page === totalPages ? styles.hide : ''}
          onClick={handleNext}
          Icon={ChevronRightIcon}
        />
      </div>
    </div>
  );
};

export default PaginationStateWrapper;
