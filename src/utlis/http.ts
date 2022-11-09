import axios from 'axios';

export const fetcher = async (url: string, options?: {}) => {
  try {
    const { data } = await axios(url, options);
    return {
      data,
    };
  } catch (error: any) {
    // console.log(error, 'error.payload');
    return {
      error,
    };
  }
};
