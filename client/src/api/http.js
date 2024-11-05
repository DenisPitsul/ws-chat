import axios from 'axios';
import queryString from 'query-string';
import CONSTANTS from '../constants';

const axiosOptions = {
  baseURL: 'http://localhost:5001/api',
};

const apiInstance = axios.create(axiosOptions);

export const getMessages = limit => apiInstance.get(`/messages?limit=${limit}`);

export const register = user => apiInstance.post('/auth/registration', user);

export const login = user => apiInstance.post('/auth/login', user);

export const getUser = token =>
  apiInstance.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getGroups = payload => {
  const query = queryString.stringify({
    groupName: payload.groupName,
    page: payload.page,
    results: CONSTANTS.GROUPS_LIMIT,
  });
  return apiInstance.get(`/groups?${query}`, {
    headers: {
      Authorization: `Bearer ${payload.token}`,
    },
  });
};
