import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputField from '../InputField/InputField.js';
import Button from '../Button/Button.js';
import { toUpperCaseFirstSymbol } from '../../helpers/textHelper.js';

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

const AddressForm = ({ onSubmit, title, subTitle, isBilling = false }) => {
  const { user } = useSelector((store) => store.user);
  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      const { firstName, lastName, address, billingAddress } = user;
      if (isBilling && billingAddress) {
        const {
          firstName,
          lastName,
          street,
          houseNumber,
          postalCode,
          city,
          country,
          phone,
        } = billingAddress;

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
      } else if (address) {
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
  }, [user, isBilling]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    Object.entries(formValues).forEach(([key, value]) => {
      if (!value) newErrors[key] = `${toUpperCaseFirstSymbol(key)} is required`;
    });

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
      <h1 className={styles.title}>
        {title ?? 'Where should we deliver your order?'}
      </h1>
      <h2 className={styles.subTitle}>
        {subTitle ??
          `Enter your delivery address below so we know exactly where to send your
        order. Make sure the address is correct before continuing.`}
      </h2>
      <form className={styles.addressForm} noValidate>
        {Object.keys(formValues).map((key) => (
          <InputField
            key={key}
            label={toUpperCaseFirstSymbol(key)}
            name={key}
            type="text"
            value={formValues[key]}
            error={errors[key]}
            onChange={handleChange}
          />
        ))}
        <Button onClick={handleForm} className={styles.btn}>
          Add Address
        </Button>
      </form>
    </div>
  );
};

export default AddressForm;
