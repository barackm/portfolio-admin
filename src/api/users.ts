import http from '../services/httpService';
import { API_END_POINT } from '../utlis/constants/constants';

const url = `${API_END_POINT}users`;

export const updateUserAsync = async (_id: string, data: any) => {
  return await http.put(`${url}/${_id}`, data);
};

export const updateUserBulkInfoAsync = async (_id: string, data: any) => {
  return await http.put(`${url}/admin/${_id}`, data);
};

export const updateUserAvatarAsync = async (_id: string, data: any) => {
  return await http.put(`${url}/${_id}/avatar`, data);
};

export const deleteUserAsync = async (_id: string) => {
  return await http.delete(`${url}/${_id}`);
};
