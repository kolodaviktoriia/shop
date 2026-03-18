import React, { useEffect, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import IconButton from '../IconButton/IconButton.js';
import * as styles from './ScrollToTopButton.module.scss';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setVisible(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <IconButton
      onClick={scrollToTop}
      Icon={ChevronUpIcon}
      className={styles.scrollToTopButton}
    />
  );
};

export default ScrollToTopButton;
