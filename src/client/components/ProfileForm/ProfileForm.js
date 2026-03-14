import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../slices/userSlice.js';
import {
  formatDateToString,
  formatValue,
  isAtLeast16,
  isValidDate,
} from '../../helpers/dateHelper.js';
import InputField from '../InputField/InputField.js';
import Button from '../Button/Button.js';
import * as styles from './ProfileForm.module.scss';

const initialState = {
  firstName: '',
  lastName: '',
  birthday: '',
};

const ProfileForm = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const { firstName, lastName, birthday } = user;
      setFormValues({
        firstName,
        lastName,
        birthday: formatDateToString(birthday),
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'birthday') {
      setFormValues((prev) => ({
        ...prev,
        birthday: formatValue(e.target.value),
      }));
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.firstName) newErrors.firstName = 'First name is required';
    if (!formValues.lastName) newErrors.lastName = 'Last name is required';
    if (!isValidDate(formValues.birthday)) newErrors.birthday = 'Invalid date';
    else if (!isAtLeast16(formValues.birthday))
      newErrors.birthday = 'You must be at least 16 years old';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(updateProfile(formValues));
    navigate('/profile/details');
  };

  return (
    <div className={styles.profileWrapper}>
      <h2 className={styles.title}>Personal Data</h2>
      <form className={styles.profileForm} noValidate>
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          value={formValues.firstName}
          error={errors.firstName}
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          value={formValues.lastName}
          error={errors.lastName}
          onChange={handleChange}
        />
        <InputField
          label="Date of Birth"
          name="birthday"
          type="text"
          value={formValues.birthday}
          error={errors.birthday}
          onChange={handleChange}
          placeholder="DD.MM.YYYY"
        />
        <Button onClick={handleLogin}>Update Personal Data</Button>
      </form>
    </div>
  );
};

export default ProfileForm;
