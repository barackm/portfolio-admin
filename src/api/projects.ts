import http from '../services/httpService';
import { API_END_POINT } from '../utlis/constants/constants';

const url = `${API_END_POINT}projects`;

export const getProjectsAsync = async () => {
  return await http.get(url);
};
