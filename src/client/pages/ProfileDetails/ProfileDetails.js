import React from 'react';
import * as styles from './ProfileDetails.module.scss';
import { useSelector } from 'react-redux';
import IconButton from '../../components/IconButton/IconButton.js';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const ProfileDetails = () => {
  const { user } = useSelector((store) => store.user);
  const { address } = user;
  const navigate = useNavigate();
  const handleEditAddress = () => {
    navigate('/profile/details/edit/address');
  }
  return (
    <div className={styles.profileDetails}>
      <h1 className={styles.title}>
        Hello, {user?.firstName} {user?.lastName}!
      </h1>
      <div className={styles.main}>
        <h2 className={styles.subTitle}>My personal data</h2>
        <span className={styles.infoText}>
          {user?.firstName} {user?.lastName}
        </span>
        <span className={styles.infoText}>{user?.email}</span>
        <h2 className={styles.subTitle}>My shipping details</h2>
        {address ? (
          <>
            <div>
              <p className={styles.infoText}>
                {address.firstName} {address.lastName}
              </p>
              <p className={styles.infoText}>
                {address.street} {address.houseNumber}
              </p>
              <p className={styles.infoText}>
                {address.postalCode} {address.city}
              </p>
              <p className={styles.infoText}>{address.country}</p>
              <p className={styles.infoText}>{address.phone}</p>
            </div>
          </>
        ) : undefined}
        <IconButton onClick={handleEditAddress} Icon={PencilIcon} label='Edit' />
      </div>
    </div>
  );
};

export default ProfileDetails;
