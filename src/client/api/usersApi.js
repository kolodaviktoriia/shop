import { getData, postData } from './axiosConfig.js';

export const getCurrentUserApi = () => getData('/api/user');

export const logoutApi = () => postData('/api/logout');

export const loginApi = (email, password) =>
  postData('/api/login', { email, password });

export const signupApi = (userData) => postData('/api/signup', { ...userData });

export const updateProfileApi = (profile) => postData('/api/profile', profile);
export const updateAddressApi = (address) => postData('/api/address', address);
