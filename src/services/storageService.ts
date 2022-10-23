import { AUTH_TOKEN } from '../utlis/constants/constants';

type storageService = {
  get: (key: string) => string | null;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
  getAuthToken: () => string | null;
  setAuthToken: (token: string) => void;
  removeAuthToken: () => void;
};

const isWindow = typeof window !== 'undefined';

const storage: storageService = {
  get: (key: string) => {
    if (!isWindow) return null;
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },

  set: (key: string, value: any) => {
    if (!isWindow) return;
    localStorage.setItem(key, JSON.stringify(value) || '');
  },

  remove: (key: string) => {
    if (!isWindow) return;
    localStorage.removeItem(key);
  },
  getAuthToken: () => {
    if (!isWindow) return null;
    return storage.get(AUTH_TOKEN);
  },
  setAuthToken: (token: string) => {
    if (!isWindow) return;
    storage.set(AUTH_TOKEN, token);
  },
  removeAuthToken: () => {
    if (!isWindow) return;
    storage.remove(AUTH_TOKEN);
  },
};

export default storage;
