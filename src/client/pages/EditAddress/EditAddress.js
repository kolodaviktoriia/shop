import React from 'react';
import AddressForm from '../../components/AddressForm/AddressForm.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAddress } from '../../slices/userSlice.js';

const EditAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleForm = (formValues) => {
    dispatch(updateAddress(formValues));
    navigate('/profile/details');
  };

  return (
    <AddressForm onSubmit={handleForm} title='Shipping Address' subTitle='Update the address where you want your orders delivered.' />
  );
};

export default EditAddress;
