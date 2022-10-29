import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan = createAction<{
  url?: string;
  onStart?: any;
  onSuccess?: any;
  onError?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  showErrorToast?: boolean;
  successAction?: any;
}>('api/callBegan');
export const apiCallSuccess = createAction<{
  type: string;
  payload: any;
}>('api/callSuccess');
export const apiCallFailed = createAction<{
  type: string;
  payload: any;
}>('api/callFailed');
