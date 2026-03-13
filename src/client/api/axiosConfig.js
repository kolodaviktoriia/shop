import axios from 'axios';

let cookieStore = null;

const isBrowser = typeof window !== 'undefined';

export const api = axios.create({
  baseURL: isBrowser ? '' : process.env.BASE_URL || 'http://localhost:3000',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (!isBrowser && cookieStore) {
    config.headers.cookie = cookieStore;
  }
  return config;
});

export const setServerCookies = (cookie) => {
  cookieStore = cookie;
};

export const clearServerCookies = () => {
  cookieStore = null;
};

export const getData = async (url, config = {}) => {
  const { data } = await api.get(url, config);
  return data;
};

export const postData = async (url, payload = {}) => {
  const { data } = await api.post(url, payload);
  return data;
};

export const deleteData = async (url, config = {}) => {
  const { data } = await api.delete(url, config);
  return data;
};
