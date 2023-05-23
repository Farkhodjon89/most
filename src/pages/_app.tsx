import '../../styles/globals.css';
import '../../public/fonts/ui-icons/style.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/700.css';
import 'slick-carousel/slick/slick.css';

// import 'slick-carousel/slick/slick-theme.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { configure } from 'axios-hooks';
import ToastContainer from 'components/ToastContainer';
import { camelizeKeys, decamelizeKeys } from 'humps';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { createEmotionSsrAdvancedApproach } from 'tss-react/nextJs';

import ProtectedRoute from '../containers/ProtectedRoute';
import StoreProvider from '../context/StoreContext';
import UserProvider from '../context/UserContext';
import theme from '../styles/theme';

const { EmotionCacheProvider, withEmotionCache } = createEmotionSsrAdvancedApproach(
  { key: 'css' } /* Argument of createCache */,
);

export const axiosClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
});

// request interceptor to add token to request headers
// todo: ReferenceError: window is not defined - что то явно я делаю тут неправильно
// Но код работает
axiosClient.interceptors.request.use(async (config) => {
  let token: any = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('mostLoginToken');
  }
  if (token) {
    config.headers = {
      accept: 'application/json',
      authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
    };
    config.onUploadProgress = () => {
      // var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    };
  }
  return config;
});
// Add a request interceptor
// axiosClient.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.data) {
      error = camelizeKeys({ ...error.response?.data, ...{ status: error.response?.status } });
    }
    return Promise.reject(error);
  },
);

// Axios middleware to convert all api responses to camelCase
axiosClient.interceptors.response.use((response: AxiosResponse) => {
  if (response.data && response.headers['content-type'] === 'application/json') {
    response.data = camelizeKeys(response.data, function (key, convert) {
      //Если ключи КОНСТАНТЫ_КЛЮЧИ, игнорим
      return /^[A-Z0-9_]+$/.test(key) ? key : convert(key);
    });
  }

  return response;
});

// Axios middleware to convert all api requests to snake_case
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig: any = { ...config };
  // newConfig.url = `api/`;

  if (newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig;

  if (config.params) {
    newConfig.params = decamelizeKeys(config.params);
  }

  if (config.data) {
    newConfig.data = decamelizeKeys(config.data);
  }

  return newConfig;
});

configure({ axios: axiosClient });

export { withEmotionCache };

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <EmotionCacheProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <StoreProvider>
            <CssBaseline />
            <ProtectedRoute router={router} pageProps={pageProps} Component={Component} />
            <ToastContainer />
          </StoreProvider>
        </UserProvider>
      </ThemeProvider>
    </EmotionCacheProvider>
  );
};

export default MyApp;
