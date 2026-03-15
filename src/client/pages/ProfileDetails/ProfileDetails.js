import React from 'react';
import { useSelector } from 'react-redux';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { formatDateToString } from '../../helpers/dateHelper.js';
import IconButton from '../../components/IconButton/IconButton.js';
import * as styles from './ProfileDetails.module.scss';
import DeliveryAddress from '../../components/DeliveryAddress/DeliveryAddress.js';

const ProfileDetails = () => {
  const { user } = useSelector((store) => store.user);
  const { address, billingAddress } = user;
  const navigate = useNavigate();
  const handleEditAddress = () => {
    navigate('/profile/details/edit/address');
  };
  const handleEditBillingAddress = () => {
    navigate('/profile/details/edit/billingAddress');
  };
  const handleEditProfile = () => {
    navigate('/profile/details/edit/profile');
  };
  return (
    <div className={styles.profileDetails}>
      <h1 className={styles.title}>
        Hello, {user?.firstName} {user?.lastName}!
      </h1>
      <div className={styles.main}>
        <h2 className={styles.subTitle}>My personal data</h2>
        <div>
          <p className={styles.infoText}>
            {user?.firstName} {user?.lastName}
          </p>
          <p className={styles.infoText}>{user?.email}</p>
          <p className={styles.infoText}>
            {formatDateToString(user?.birthday)}
          </p>
        </div>
        <IconButton
          onClick={handleEditProfile}
          Icon={PencilIcon}
          label="Edit"
        />
        <h2 className={styles.subTitle}>My shipping details</h2>
        {address ? <DeliveryAddress address={address} isDark /> : undefined}
        <IconButton
          onClick={handleEditAddress}
          Icon={PencilIcon}
          label="Edit"
        />
        <h2 className={styles.subTitle}>My billing details</h2>
        {billingAddress ? (
          <DeliveryAddress address={billingAddress} isDark />
        ) : undefined}
        <IconButton
          onClick={handleEditBillingAddress}
          Icon={PencilIcon}
          label="Edit"
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
