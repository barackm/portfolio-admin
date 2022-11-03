import http from '../services/httpService';
import { API_END_POINT } from '../utlis/constants/constants';

const url = `${API_END_POINT}articles`;

export const getArticlesAsync = async () => {
  return await http.get(url);
};

export const getSingleArticleAsync = async (articleId: string) => {
  return await http.get(`${url}/${articleId}`);
};
