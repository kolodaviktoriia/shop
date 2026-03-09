import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button.js';
import * as styles from './Profile.module.scss';
import { logoutUser } from '../../slices/userSlice.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import LoginGrid from '../../components/LoginGrid/LoginGrid.js';

const Profile = () => {
    const { user } = useSelector(store => store.user);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return user ? (
        <div className={styles.profile}>
            <WidthWrapper className={styles.profileWrapper}>
                <div className={styles.navigation}>
                    <Button onClick={handleLogout}>Log out</Button>
                </div>
                <div className={styles.info}>
                    <h2 className={styles.title}>Hello, {user?.firstName} {user?.lastName}!</h2>
                    <div className={styles.main}>
                        <h3 className={styles.subTitle}>My personal data</h3>
                        <span className={styles.infoText}>{user?.firstName} {user?.lastName}</span>
                        <span className={styles.infoText}>{user?.email}</span>
                    </div>
                </div>
            </WidthWrapper>
        </div >

    ) : (<LoginGrid />)
}

export default Profile;