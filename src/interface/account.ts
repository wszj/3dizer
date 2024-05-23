import TelegramIcon from "../assets/images/account/telegram.png"
import TwitterIcon from "../assets/images/account/twitter.png"
import DiscordIcon from "../assets/images/account/discord.png"

/**积分记录行数据 */
export interface PointDetailsProps {
  rewardTime: string
  rewardType: number
  rewardPoint: number
  detail: string
}

/**分页获取积分记录接口数据 */
export interface PointDetailsResult {
  total: number
  current: number
  dataList: PointDetailsProps[]
}

/**分页请求参数 */
export interface PointDetailsParams {
  pageIndex: number
  pageSize: number
}

/**用户积分数据 */
export interface UserPointResult {
  totalPoints: number
  signUpReward: 0 | 1
  downloadMagic3dReward: 0 | 1
  invitationCode: string
  invitationLink: string
  dailySignReward: {
    [prop:string]: 0 | 1
  }
}

export enum FollowAccountType {
  Telegram = 1,
  Discord = 2,
  Twitter = 3
}
export const followAccountIcon = {
  [FollowAccountType.Telegram]: TelegramIcon,
  [FollowAccountType.Discord]: DiscordIcon,
  [FollowAccountType.Twitter]: TwitterIcon
}
export interface FollowAccountItem {
  type: FollowAccountType
  userName: string
}
/**第三方社交账号信息 */
export type FollowAccountList = FollowAccountItem[]