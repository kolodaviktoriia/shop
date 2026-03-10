import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button.js';
import * as styles from './Profile.module.scss';
import { logoutUser } from '../../slices/userSlice.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import LoginGrid from '../../components/LoginGrid/LoginGrid.js';
import ButtonLink from '../../components/ButtonLink/ButtonLink.js';
import { Outlet } from 'react-router-dom';

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
                    <ButtonLink to='/profile/details'>Profile</ButtonLink>
                    <ButtonLink to='/profile/orders'>Orders</ButtonLink>
                    <Button onClick={handleLogout}>Log out</Button>
                </div>
                <div className={styles.info}>
                    <Outlet />
                </div>
            </WidthWrapper>
        </div >

    ) : (<LoginGrid />)
}

export default Profile;