import { getData, postData } from './axiosConfig.js';

export const getCurrentUserApi = () => getData('/api/user');

export const logoutApi = () => postData('/api/logout');

export const loginApi = (email, password) =>
  postData('/api/login', { email, password });

export const signupApi = (userData) => postData('/api/signup', { ...userData });
