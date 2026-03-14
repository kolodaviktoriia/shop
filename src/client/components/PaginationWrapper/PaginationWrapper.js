import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import * as styles from './PaginationWrapper.module.scss';

const PaginationWrapper = ({ children, totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);

  const handleNext = () => {
    setSearchParams({ page: page + 1 });
  };
  const handleBack = () => {
    setSearchParams({ page: page - 1 });
  };

  return !totalPages || totalPages === 1 ? (
    <>{children}</>
  ) : (
    <div className={styles.pagination}>
      {children}
      <div className={styles.navigation}>
        <button
          className={`${styles.btn} ${page === 1 ? styles.hide : ''}`}
          onClick={handleBack}
        >
          <ChevronLeftIcon className={styles.icon} />
        </button>
        <span className={styles.page}>
          Page {page} of {totalPages}
        </span>
        <button
          className={`${styles.btn} ${page === totalPages ? styles.hide : ''}`}
          onClick={handleNext}
        >
          <ChevronRightIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default PaginationWrapper;
