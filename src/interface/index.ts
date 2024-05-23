export interface Locales<T = any> {
    /** Chinese */
    zh_CN: T;
    /** English */
    en_US: T;
  }
  
  export type Language = keyof Locales;
  
  export interface PageData<T> {
    pageNum: number;
    pageSize: number;
    total: number;
    data: T[];
  }
  
  /**
   * 用户信息
   */
  export interface UserInfo {
    name: string;
    isUserLogin: boolean;
    avatar?: string;
    email: string;
    userEmail: string;
    walletAddress?: string
  }