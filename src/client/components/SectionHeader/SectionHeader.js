import React from 'react';
import * as styles from './SectionHeader.module.scss';

const SectionHeader = ({ name, imageUrl, description, className }) => {
    return (
        <div className={`${styles.sectionHeader} ${className}`} onClick={() => handleClick(name)}>
            <img src={imageUrl} />
            <div className={styles.textWrapper}>
                <h2 className={styles.title}>{name}</h2>
                <h3 className={styles.description}>{description}</h3>
            </div>
        </div >
    )
}

export default SectionHeader;