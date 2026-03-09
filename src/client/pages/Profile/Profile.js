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
                    <h2>Hello,{user?.firstName} {user?.lastName}!</h2>
                </div>
            </WidthWrapper>
        </div >

    ) : (<LoginGrid />)
}

export default Profile;