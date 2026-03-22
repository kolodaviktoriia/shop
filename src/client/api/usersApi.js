import { getData, postData } from './axiosConfig.js';

export const getCurrentUserApi = () => getData('/user');

export const logoutApi = () => postData('/logout');

export const loginApi = (email, password) =>
  postData('/login', { email, password });

export const signupApi = (userData) => postData('/signup', { ...userData });

export const updateProfileApi = (profile) => postData('/profile', profile);
export const updateAddressApi = (address) => postData('/address', address);
export const updateBillingAddressApi = (address) =>
  postData('/billingAddress', address);
