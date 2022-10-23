import { toast } from 'react-toastify';

export const getErrorMessage = (error: any) => {
  if (error.response) {
    return error.response.data;
  } else if (error.request) {
    return error.request;
  } else {
    return error.message;
  }
};

export const displayError = (error: any) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    return toast.error(getErrorMessage(error));
  } else {
    return toast.error('An unexpected error occurred.');
  }
};
