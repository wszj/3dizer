/** user's role */
export type Role = 'guest' | 'admin';

export interface LoginParams {
  /** 用户名 */
  username: string;
  /** 用户密码 */
  password: string;
}

export interface LoginResult {
  /** auth token */
  token: string;
  username: string;
  role: Role;
}

export interface LogoutParams {
  token: string;
}

export interface LoginUser {
    data:object;
    
}

export interface requestParams {
  token:string;
  check:string;
  accessToken:string;
  data: {
   
    user:{
      accessToken:string;
    }
  };
  code: number;
  status: boolean;
}