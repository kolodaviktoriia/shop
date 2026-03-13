import React from 'react';
import * as styles from './DeliveryAddress.module.scss';

const DeliveryAddress = ({ address }) => {

    const { firstName,
        lastName,
        street,
        houseNumber,
        postalCode,
        city,
        country,
        phone } = address;

    return (
        <div className={styles.delivery}>
            <p className={styles.deliveryText}>{firstName} {lastName}</p>
            <p className={styles.deliveryText}>{street} {houseNumber}</p>
            <p className={styles.deliveryText}>{postalCode} {city}</p>
            <p className={styles.deliveryText}>{country}</p>
            <p className={styles.deliveryText}>{phone}</p>
        </div>

    )
}

export default DeliveryAddress;