import { request } from '../../utils/request';
import { requestParams } from '../../interface/Login';

// 查询接口
export const getUserExists = (params: any) => request<requestParams>('get', `/user/getUserExists/${params}`);

// 注册接口
export const registerByEmail = (data: any) => request<requestParams>('post', `/user/registerByEmail`,data);

// 邮箱发送安全码
export const sendSecurityCode = (data: any) => request<requestParams>('get', `/user/sendSecurityCode/${data.email}/${data.type}`);

// 登录接口
export const postLoginByEmail = (data: any) => request<requestParams>('post', `/user/loginByEmail`,data);

// 忘记密码
export const postForgetPassword = (data: any) => request<requestParams>('post', `/user/forgetPassword`,data);

// 安全码是否有效接口
export const postCheckSecurityCode= (data: any) => request<requestParams>('post', `/user/checkSecurityCode`,data);

// 第三方注册
export const postSocialAccount= (data: any) => request<requestParams>('post', `/socialAccount/register`,data);

// 第三方登录
export const postSocialAccountLogin= (data: any) => request<requestParams>('post', `/socialAccount/login`,data);

// 查询第三方接口
export const postUserExists = (data: any) => request<requestParams>('post', `/socialAccount/getUserExists`,data);

