import React, { useEffect } from 'react';
import * as styles from './ProfileDetails.module.scss';
import { useSelector } from 'react-redux';

const ProfileDetails = () => {
    const { user } = useSelector(store => store.user);
    const { address } = user;
    return (
        <div className={styles.profileDetails}>
            <h2 className={styles.title}>Hello, {user?.firstName} {user?.lastName}!</h2>
            <div className={styles.main}>
                <h3 className={styles.subTitle}>My personal data</h3>
                <span className={styles.infoText}>{user?.firstName} {user?.lastName}</span>
                <span className={styles.infoText}>{user?.email}</span>
                {address ? <>  <h3 className={styles.subTitle}>My shipping details</h3>
                    <div className={styles.delivery}>
                        <p className={styles.infoText}>{address.firstName} {address.lastName}</p>
                        <p className={styles.infoText}>{address.street} {address.houseNumber}</p>
                        <p className={styles.infoText}>{address.postalCode} {address.city}</p>
                        <p className={styles.infoText}>{address.country}</p>
                        <p className={styles.infoText}>{address.phone}</p>
                    </div></> : undefined
                }

            </div>
        </div>
    )
}

export default ProfileDetails;