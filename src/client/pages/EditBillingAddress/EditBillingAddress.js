import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateBillingAddress } from '../../slices/userSlice.js';
import AddressForm from '../../components/AddressForm/AddressForm.js';
import BackButton from '../../components/BackButton/BackButton.js';
import * as styles from './EditBillingAddress.module.scss';

const EditBillingAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleForm = (formValues) => {
    dispatch(updateBillingAddress(formValues));
    navigate('/profile/details');
  };

  return (
    <div className={styles.editAddress}>
      <AddressForm
        onSubmit={handleForm}
        title="Billing Address"
        subTitle="Update the address associated with your billing information"
      />
      <BackButton
        className={styles.btn}
        to="/profile/details"
        label="Back To Profile"
      />
    </div>
  );
};

export default EditBillingAddress;
