import React from 'react';
import * as styles from './DeliveryAddress.module.scss';

const DeliveryAddress = ({ address, isDark = false }) => {
  const {
    firstName,
    lastName,
    street,
    houseNumber,
    postalCode,
    city,
    country,
    phone,
  } = address;

  const textClasses = `${styles.deliveryText}  ${isDark ? styles.darkText : ''} `;

  return (
    <div className={styles.delivery}>
      <p className={textClasses}>
        {firstName} {lastName}
      </p>
      <p className={textClasses}>
        {street} {houseNumber}
      </p>
      <p className={textClasses}>
        {postalCode} {city}
      </p>
      <p className={textClasses}>{country}</p>
      <p className={textClasses}>{phone}</p>
    </div>
  );
};

export default DeliveryAddress;
