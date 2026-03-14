import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAddress } from '../../slices/userSlice.js';
import AddressForm from '../../components/AddressForm/AddressForm.js';
import BackButton from '../../components/BackButton/BackButton.js';
import * as styles from './EditAddress.module.scss';

const EditAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleForm = (formValues) => {
    dispatch(updateAddress(formValues));
    navigate('/profile/details');
  };

  return (
    <div className={styles.editAddress}>
      <AddressForm
        onSubmit={handleForm}
        title="Shipping Address"
        subTitle="Update the address where you want your orders delivered."
      />
      <BackButton
        className={styles.btn}
        to="/profile/details"
        label="Back To Profile"
      />
    </div>
  );
};

export default EditAddress;
