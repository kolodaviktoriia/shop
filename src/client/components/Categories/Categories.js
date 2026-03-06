import React from 'react';
import * as styles from './Categories.module.scss';
import { useSelector } from 'react-redux';
import WidthWrapper from '../WidthWrapper/WidthWrapper.js';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const { categories } = useSelector(store => store.products);
    const navigate = useNavigate();
    const handleClick = (category) => {
        navigate(`/products/${category}`);
    }

    return (
        <WidthWrapper className={styles.categories}>
            {categories?.map(({ name, description, imageUrl, id }) =>
            (<div key={id} className={styles.category} onClick={() => handleClick(name)}>
                <img key={id} src={imageUrl} />
                <div className={styles.textWrapper}>
                    <h2 className={styles.title}>{name}</h2>
                    <h3 className={styles.description}>{description}</h3>
                </div>
            </div>)
            )}
        </WidthWrapper >
    )
}

export default Categories;