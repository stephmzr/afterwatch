import axios from 'axios';
import { get } from 'lodash';
import { camelizeKeys, decamelizeKeys } from 'humps';
import qs from 'qs';
import handleNotifications from './handleNotifications';
import { Authenticity } from './authenticity';

const axiosClient = axios.create({
  baseURL: "/",
  responseType: 'json',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    config.paramsSerializer = (params) =>
      qs.stringify(params, { arrayFormat: 'brackets' });
    config.headers = {
      ...(config.headers || {}),
      ...Authenticity.headers()
    };
    if (
      config.data &&
      config.headers['Content-Type'] &&
      config.headers['Content-Type'] === 'application/json'
    )
      config.data = decamelizeKeys(config.data);
    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data) {
      const notifications = get(data, 'data.notifications', null);
      if (notifications) handleNotifications(notifications);
    }
    return response.data.data;
  },
  ({ response }) => {
    if (response && response.status === 422) {
      return Promise.reject(camelizeKeys(response.data.data || response.data));
    }
    if (response && response.status === 403) {
      handleNotifications([
        {
          type: 'error',
          description: 'You are not authorized to access this page',
        },
      ]);
    }
    return response.data.data;
  },
);

export default axiosClient;
