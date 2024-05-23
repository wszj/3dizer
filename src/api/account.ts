import { request } from '../utils/request';
import {
  PointDetailsResult,
  PointDetailsParams,
  UserPointResult,
  FollowAccountList
} from '../interface/account';

/**修改钱包地址 */
export const updateWalletAddress = (data: any) => request<any>('post', '/user/updateWalletAddress', data);

/**分页获取积分记录 */
export const getPointsDetails = (data: PointDetailsParams) => request<PointDetailsResult>('post', '/integral/pointsDetails', data)

/**获取用户积分信息 */
export const getUserPointInfo = () => request<UserPointResult>('get', '/integral/earnPoints')

/**签到接口，每日签到10积分 */
export const signIn = () => request<null>('get', `/integral/signIn`)

/**获取第三方账户信息 */
export const getFollowAccountInfo = () => request<{followAccountList: FollowAccountList}>('get', '/followMe/followAccount')

/**设置第三方账户信息 */
export const setFollowAccountInfo = (data: {followAccountList: FollowAccountList}) => request<null>('post', '/followMe/followAccountSet', data)