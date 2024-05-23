import { PublicKey } from "@solana/web3.js"

function padLeftZero(str: string) {
  return ('00' + str).substring(str.length);
}
/**将时间戳转换为yyyy-mm-dd格式
 * @param time 时间戳
 */
export function formatTime(time: number | string, fmt: string = "yyyy-MM-dd") {
  if (typeof time === 'string') {
    time = parseInt(time);
  }
  const date = new Date(time);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k as keyof typeof o] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
export function GetQueryString(name:any) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
/**验证钱包地址是否为solana钱包地址 */
export function validSolanaAddress(address: string){
  try{
    const publicKey = new PublicKey(address);
    return true
  }catch(err){
    return false
  }
}

export function obfuscateEmail(email:string) {
  // 将邮箱地址拆分成数组
  const parts = email.split('@');
  const username = parts[0];
  const domain = parts[1];

  // 获取用户名的长度
  const usernameLength = username.length;

  // 如果用户名长度小于 4，则取前 1 位并补充 3 个 "*"
  if (usernameLength < 6) {
    const obfuscatedUsername = username.substring(0, 1) + '***';
    return obfuscatedUsername + '@' + domain;
  }

  // 计算中间 4 位字符的起始索引
  const startIndex = Math.floor(usernameLength / 2) - 2;
  const endIndex = startIndex + 4;

  // 用 "*" 替换中间 4 位字符
  const obfuscatedUsername = username.substring(0, startIndex) + '****' + username.substring(endIndex);

  // 拼接处理后的邮箱地址
  return obfuscatedUsername + '@' + domain;
}