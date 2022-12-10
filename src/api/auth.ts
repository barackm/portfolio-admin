import http from '../services/httpService';
import { API_END_POINT } from '../utlis/constants/constants';

const url = `${API_END_POINT}auth`;
export const loginUserAsync = async (data: any) => {
  return await http.post(`${url}/login`, data);
};

export const getCurrentUserInfoAsync = async () => {
  return await http.get(`${url}/me`);
};

export const verifyEmailAsync = async (data: any) => {
  return await http.post(`${url}/verify-email`, data);
};

export const forgotPasswordAsync = async (data: any) => {
  return await http.post(`${url}/forgot-password`, data);
};

export const resetPasswordAsync = async (data: any) => {
  return await http.post(`${url}/reset-password`, data);
};
