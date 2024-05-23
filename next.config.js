/*
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-11-20 19:25:54
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2022-12-05 19:33:14
 * @FilePath: /abeats-website/next.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** @type {import('next').NextConfig} */
//const withTM = require("next-transpile-modules")(["echarts", "zrender"])
// console.log(process.env,'ass3344',process.env.NODE_ENV)
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  basePath: '/',
  assetPrefix:'https://3dizer.ai',
//   reactStrictMode: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false
  },
  sassOptions: {
    // add sass config here
  },
}

module.exports = nextConfig//withTM(nextConfig)
