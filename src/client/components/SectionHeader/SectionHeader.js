import React from 'react';
import * as styles from './SectionHeader.module.scss';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';

const SectionHeader = ({ name, imageUrl, description, extra, className }) => {
  return (
    <div className={`${styles.sectionHeader} ${className}`}>
      <img src={imageUrl} loading="lazy" alt={name} />
      <WidthWrapper className={styles.textWrapper}>
        <h2 className={styles.title}>{name}</h2>
        <h3 className={styles.description}>{description}</h3>
        {extra && <h3 className={styles.description}>{extra}</h3>}
      </WidthWrapper>
    </div>
  );
};

export default SectionHeader;
