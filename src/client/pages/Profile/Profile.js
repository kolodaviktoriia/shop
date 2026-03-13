import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { logoutUser } from '../../slices/userSlice.js';
import Button from '../../components/Button/Button.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import LoginGrid from '../../components/LoginGrid/LoginGrid.js';
import ButtonLink from '../../components/ButtonLink/ButtonLink.js';
import Spinner from '../../components/Spinner/Spinner.js';
import SEO from '../../components/SEO.js';

import * as styles from './Profile.module.scss';
const Profile = () => {
    const { user, loading } = useSelector(store => store.user);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    if (loading) return <Spinner />;

    return user ? (
        <div className={styles.profile}>
            <SEO
                title='Your Profile'
            />
            <WidthWrapper className={styles.profileWrapper}>
                <div className={styles.navigation}>
                    <ButtonLink to='/profile/details'>Profile</ButtonLink>
                    <ButtonLink to='/profile/favorites'>Favorites</ButtonLink>
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