import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputField from '../InputField/InputField.js';
import Button from '../Button/Button.js';
import { CheckIcon } from '@heroicons/react/24/solid';

import { toUpperCaseFirstSymbol } from '../../helpers/textHelper.js';
import * as styles from './AddressOrderForm.module.scss';

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

const AddressOrderForm = ({ onSubmit }) => {
  const { user } = useSelector((store) => store.user);
  const [deliveryValues, setDeliveryValues] = useState(initialState);
  const [billingValues, setBillingValues] = useState(initialState);
  const [billingSameAsDelivery, setBillingSameAsDelivery] = useState(false);
  const [errors, setErrors] = useState({ delivery: {}, billing: {} });

  useEffect(() => {
    if (user) {
      const { address, billingAddress } = user;
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
        setDeliveryValues({
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
      }

      if (billingAddress) {
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
        setBillingValues({
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
      }
    }
  }, [user]);

  const handleChange = (e, type = 'delivery') => {
    const { name, value } = e.target;
    if (type === 'delivery') {
      setDeliveryValues((prev) => ({ ...prev, [name]: value }));
      if (billingSameAsDelivery) {
        setBillingValues((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setBillingValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckbox = () => {
    setBillingSameAsDelivery((prev) => !prev);
    if (!billingSameAsDelivery) {
      setBillingValues(initialState);
    } else {
      setBillingValues({ ...deliveryValues });
    }
  };

  const validate = () => {
    const newErrors = { delivery: {}, billing: {} };

    Object.entries(deliveryValues).forEach(([key, value]) => {
      if (!value)
        newErrors.delivery[key] = `${toUpperCaseFirstSymbol(key)} is required`;
    });
    if (!billingSameAsDelivery) {
      Object.entries(billingValues).forEach(([key, value]) => {
        if (!value)
          newErrors.billing[key] = `${toUpperCaseFirstSymbol(key)} is required`;
      });
    }
    setErrors(newErrors);
    return (
      Object.keys(newErrors.delivery).length === 0 &&
      Object.keys(newErrors.billing).length === 0
    );
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(
      billingSameAsDelivery
        ? { address: deliveryValues, billingAddress: deliveryValues }
        : { address: deliveryValues, billingAddress: billingValues }
    );
  };

  return (
    <div className={styles.addressFormWrapper}>
      <h1 className={styles.title}>Delivery & Billing Addresses</h1>
      <h2 className={styles.subTitle}>
        Enter your delivery and billing addresses below. You can use the same
        address for both or provide different ones. Make sure all information is
        correct before continuing.
      </h2>
      <h3 className={styles.formTitle}>Delivery Address</h3>
      <form noValidate>
        <div className={styles.addressForm}>
          {Object.keys(deliveryValues).map((key) => (
            <InputField
              key={key}
              label={toUpperCaseFirstSymbol(key)}
              name={key}
              type="text"
              value={deliveryValues[key]}
              error={errors.delivery[key]}
              onChange={(e) => handleChange(e, 'delivery')}
            />
          ))}
        </div>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            id="billingSame"
            checked={billingSameAsDelivery}
            onChange={handleCheckbox}
          />
          <label htmlFor="billingSame">
            <span className={styles.customCheckbox}>
              {billingSameAsDelivery && <CheckIcon className={styles.icon} />}
            </span>
            Billing same as delivery
          </label>
        </div>

        {!billingSameAsDelivery && (
          <>
            <h3 className={styles.formTitle}>Billing Address</h3>
            <div className={styles.addressForm}>
              {Object.keys(billingValues).map((key) => (
                <InputField
                  key={key}
                  label={toUpperCaseFirstSymbol(key)}
                  name={key}
                  type="text"
                  value={billingValues[key]}
                  error={errors.billing[key]}
                  onChange={(e) => handleChange(e, 'billing')}
                />
              ))}
            </div>
          </>
        )}

        <Button onClick={handleForm} className={styles.btn}>
          Add Addresses
        </Button>
      </form>
    </div>
  );
};

export default AddressOrderForm;
