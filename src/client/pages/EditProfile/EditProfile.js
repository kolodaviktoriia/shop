import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAddress } from '../../slices/userSlice.js';
import ProfileForm from '../../components/ProfileForm/ProfileForm.js';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleForm = (formValues) => {
    dispatch(updateAddress(formValues));
    navigate('/profile/details');
  };

  return (
    <ProfileForm
      onSubmit={handleForm}
      title="Shipping Address"
      subTitle="Update the address where you want your orders delivered."
    />
  );
};

export default EditProfile;
