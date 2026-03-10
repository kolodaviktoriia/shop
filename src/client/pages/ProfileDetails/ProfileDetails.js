import React, { useEffect } from 'react';
import * as styles from './ProfileDetails.module.scss';
import { useSelector } from 'react-redux';

const ProfileDetails = () => {
    const { user } = useSelector(store => store.user);
    return (
        <div className={styles.profileDetails}>
            <h2 className={styles.title}>Hello, {user?.firstName} {user?.lastName}!</h2>
            <div className={styles.main}>
                <h3 className={styles.subTitle}>My personal data</h3>
                <span className={styles.infoText}>{user?.firstName} {user?.lastName}</span>
                <span className={styles.infoText}>{user?.email}</span>
            </div>
        </div>
    )
}

export default ProfileDetails;