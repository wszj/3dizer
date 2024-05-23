import axios, { AxiosRequestConfig, Method } from 'axios';
import { createStandaloneToast } from '@chakra-ui/react'
import { updateToken,updateLogin } from '../stores/userSlice'
import {store} from '../stores/index';

const { toast } = createStandaloneToast()

const axiosInstance = axios.create({
  timeout: 100000,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
     const userState = store.getState().user;

     console.log(userState,'token==>',store.getState().user.token)
    if (!userState?.token) {
      const token: string = sessionStorage.getItem('token') || '';
      console.log(token,'sessionStorage==>')
      store.dispatch(updateToken(token));

      console.log(config, 'config==>',userState);
      config.headers['Authorization'] = userState?.token;
    } else {
      config.headers['Authorization'] = userState?.token;
    }
   
    return config;
  },
  error => {
    // store.dispatch(
    //   setGlobalState({
    //     loading: false,
    //   }),
    // );
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    // store.dispatch(
    //   setGlobalState({
    //     loading: false,
    //   }),
    // );
    console.log(config,'response===>')
    if (config?.data?.message) {
      // $message.success(config.data.message)
    }
   
    if(config?.data?.code===1011){
      toast({
        title: 'token expires!',
        status: 'error',
        position: 'top',
        duration: 3000,
      }) 
      sessionStorage.clear()
      store.dispatch(updateLogin(false));
      window.location.href = '/';
      return;
    }

    return config?.data;
  },
  error => {
    console.log(error);
    // store.dispatch(
    //   setGlobalState({
    //     loading: false,
    //   }),
    // );
    // if needs to navigate to login page when request exception
    // history.replace('/login');
    let errorMessage = '系统异常';

    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络';
    } else {
      errorMessage = error?.message;
    }
  
    error.message && toast({
        title: errorMessage,
        // description: "We've created your account for you.",
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      }) 

    return {
      status: false,
      message: errorMessage,
      msg:errorMessage,
      data: null,
    };
  },
);

export type Response<T = any> = {
  status: boolean;
  message: string;
  msg:string;
  data: T;
  code: number;
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  // const prefix = '/api'
  const prefix = 'https://cloud.arknovv.net/3dizer';

  url = prefix + url;
  console.log(url,'url===>')
  if (method === 'post') {
    return axiosInstance.post(url, data, config);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
