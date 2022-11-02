import { toast } from 'react-toastify';

export const getErrorMessage = (error: any) => {
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    return error.response.data.message;
  }

  return error.message || 'Something went wrong';
};

export const displayError = (error: any) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    return toast.error(getErrorMessage(error));
  }
};
