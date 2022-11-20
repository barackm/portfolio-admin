import http from '../services/httpService';
import { API_END_POINT } from '../utlis/constants/constants';

const url = `${API_END_POINT}articles`;

export const getArticlesAsync = async () => {
  return await http.get(url);
};

export const getSingleArticleAsync = async (articleId: string) => {
  return await http.get(`${url}/${articleId}`);
};

export const deleteArticleAsync = async (articleId: string) => {
  return await http.delete(`${url}/${articleId}`);
};

export const saveArticleAsync = async (articleId: string, article: any) => {
  return await http.put(`${url}/save/${articleId}`, article);
};

export const publishArticleAsync = async (articleId: string) => {
  return await http.put(`${url}/publish/${articleId}`);
};

export const unPublishArticleAsync = async (articleId: string) => {
  return await http.put(`${url}/unpublish/${articleId}`);
};

export const scheduleArticleAsync = async (articleId: string, article: any) => {
  return await http.put(`${url}/schedule/${articleId}`, article);
};
