import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputField from '../InputField/InputField.js';
import Button from '../Button/Button.js';

import * as styles from './AddressForm.module.scss';

const initialState = {
  firstName: '',
  lastName: '',
  street: '',
  houseNumber: '',
  postalCode: '',
  city: '',
  country: '',
  phone: '',
};

const AddressForm = ({ onSubmit, title, subTitle }) => {
  const { user } = useSelector((store) => store.user);
  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const { firstName, lastName, address } = user;
      if (address) {
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

        setFormValues({
          ...initialState,
          firstName,
          lastName,
          street,
          houseNumber,
          postalCode,
          city,
          country,
          phone,
        });
      } else {
        setFormValues({ ...initialState, firstName, lastName });
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formValues.firstName) newErrors.firstName = 'First name is required';
    if (!formValues.lastName) newErrors.lastName = 'Last name is required';
    if (!formValues.street) newErrors.street = 'Street is required';
    if (!formValues.houseNumber)
      newErrors.houseNumber = 'House number is required';
    if (!formValues.postalCode)
      newErrors.postalCode = 'Postal code is required';
    if (!formValues.city) newErrors.city = 'City is required';
    if (!formValues.country) newErrors.country = 'Country is required';
    if (!formValues.phone) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(formValues);
  };

  return (
    <div className={styles.addressFormWrapper}>
      <h1 className={styles.title}>{title ?? 'Where should we deliver your order?'}</h1>
      <h2 className={styles.subTitle}>
        {subTitle ?? `Enter your delivery address below so we know exactly where to send your
        order. Make sure the address is correct before continuing.`}
      </h2>
      <form className={styles.addressForm} noValidate>
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
          label="Street"
          name="street"
          type="text"
          value={formValues.street}
          error={errors.street}
          onChange={handleChange}
        />
        <InputField
          label="House Number"
          name="houseNumber"
          type="text"
          value={formValues.houseNumber}
          error={errors.houseNumber}
          onChange={handleChange}
        />
        <InputField
          label="Postal Code"
          name="postalCode"
          type="text"
          value={formValues.postalCode}
          error={errors.postalCode}
          onChange={handleChange}
        />
        <InputField
          label="City"
          name="city"
          type="text"
          value={formValues.city}
          error={errors.city}
          onChange={handleChange}
        />
        <InputField
          label="Country"
          name="country"
          type="text"
          value={formValues.country}
          error={errors.country}
          onChange={handleChange}
        />
        <InputField
          label="Phone"
          name="phone"
          type="text"
          value={formValues.phone}
          error={errors.phone}
          onChange={handleChange}
        />
        <Button onClick={handleForm} className={styles.btn}>
          Add Address
        </Button>
      </form>
    </div>
  );
};

export default AddressForm;
