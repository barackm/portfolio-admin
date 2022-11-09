import axios from 'axios';
import { toast } from 'react-toastify';
import { API_END_POINT, authorization } from '../utlis/constants/constants';
import storage from './storageService';

axios.defaults.headers.common[
  authorization
] = `Bearer ${storage.getAuthToken()}`;
axios.defaults.baseURL = API_END_POINT.split('/').slice(0, -1).join('/');
axios.interceptors.response.use(
  (resp) => resp,
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      toast.error('An unexpected error occurred.');
    }
    return Promise.reject(error);
  },
);

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  request: axios.request,
  headers: axios.defaults.headers,
  patch: axios.patch,
};

export default http;
