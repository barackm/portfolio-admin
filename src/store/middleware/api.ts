import http from '../../services/httpService';
import { API_END_POINT } from '../../utlis/constants/constants';
import { displayError, getErrorMessage } from '../../utlis/errorHandler';
import * as actions from '../actions/api';

const api =
  ({ dispatch }: any) =>
  (next: any) =>
  async (action: any) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const {
      url,
      method,
      data,
      onStart,
      onSuccess,
      onError,
      showErrorToast,
      successAction,
    } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = await http.request({
        baseURL: API_END_POINT,
        url,
        method,
        data,
      });
      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
      if (successAction) successAction(response.data);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      dispatch(actions.apiCallFailed(errorMessage));
      if (onError) dispatch({ type: onError, payload: errorMessage });
      if (showErrorToast) {
        displayError(error);
      }
    }
  };

export default api;
