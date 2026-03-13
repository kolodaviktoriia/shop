import React from 'react';
import * as styles from './Address.module.scss';
import AddressForm from '../../components/AddressForm/AddressForm.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import { useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../slices/ordersSlice.js';

const Address = () => {
  const { setStep } = useOutletContext();
  const dispatch = useDispatch();

  const handleForm = (formValues) => {
    dispatch(addAddress(formValues));
    setStep((cur) => cur + 1);
  };

  return (
    <WidthWrapper className={styles.addressWrapper}>
      <AddressForm onSubmit={handleForm} />
      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.icon}>
            <ion-icon name="information-circle-outline"></ion-icon>
          </span>
          <span className={styles.info}>Free delivery on orders over €50</span>
        </div>
        <div className={styles.row}>
          <span className={styles.icon}>
            <ion-icon name="information-circle-outline"></ion-icon>
          </span>
          <span className={styles.info}>Quick and reliable delivery</span>
        </div>
        <div className={styles.row}>
          <span className={styles.icon}>
            <ion-icon name="time-outline"></ion-icon>
          </span>
          <span className={styles.info}>Real-time delivery updates</span>
        </div>
        <div className={styles.row}>
          <span className={styles.icon}>
            <ion-icon name="cube-outline"></ion-icon>
          </span>
          <span className={styles.info}>Safe and secure order handling</span>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default Address;
