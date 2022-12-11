import http from '../services/httpService';
import { API_END_POINT } from '../utlis/constants/constants';

const url = `${API_END_POINT}projects`;

export const getProjectsAsync = async (options?: {}) => {
  return await http.get(url, {
    ...options,
  });
};

export const getSingleProjectAsync = async (projectId: string) => {
  return await http.get(`${url}/${projectId}`);
};

export const updateProjectAsync = async (data: any, projectId: string) => {
  return await http.put(`${url}/${projectId}`, data);
};

export const createProjectAsync = async (data: any) => {
  return await http.post(url, data);
};

export const deleteProjectAsync = async (projectId: string) => {
  return await http.delete(`${url}/${projectId}`);
};
