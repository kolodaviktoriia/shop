import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchCurrentUser, logoutUser } from '../../slices/userSlice.js';
import Button from '../../components/Button/Button.js';
import WidthWrapper from '../../components/WidthWrapper/WidthWrapper.js';
import LoginGrid from '../../components/LoginGrid/LoginGrid.js';
import ButtonLink from '../../components/ButtonLink/ButtonLink.js';
import Spinner from '../../components/Spinner/Spinner.js';
import SEO from '../../components/SEO.js';
import LinkProfile from '../../components/LinkProfile/LinkProfile.js';

import * as styles from './Profile.module.scss';

const Profile = () => {
  const { user, loading, needRefresh } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (needRefresh) dispatch(fetchCurrentUser());
  }, [needRefresh, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!user && loading) return <Spinner />;

  return user ? (
    <div className={styles.profile}>
      <SEO title="Your Profile" />
      <WidthWrapper className={styles.profileWrapper}>
        <div className={styles.navigation}>
          <LinkProfile to="/profile/details">Profile</LinkProfile>
          <LinkProfile to="/profile/favorites">Favorites</LinkProfile>
          <LinkProfile to="/profile/orders">Orders</LinkProfile>
          <LinkProfile onClick={handleLogout}>Log out</LinkProfile>
        </div>
        <div className={styles.info}>{loading ? <Spinner /> : <Outlet />}</div>
      </WidthWrapper>
    </div>
  ) : (
    <LoginGrid />
  );
};

export default Profile;
