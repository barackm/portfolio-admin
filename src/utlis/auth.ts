import axios from 'axios';
import _ from 'lodash';
import storage from '../services/storageService';

export const updateToken = (token: string | null = null) => {
  if (_.isEmpty(token)) {
    storage.removeAuthToken();
    return delete axios.defaults.headers.common['Authorization'];
  }
  token && storage.setAuthToken(token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return token;
};
