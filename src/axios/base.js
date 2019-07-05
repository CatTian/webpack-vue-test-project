/**
 * 接口域名的管理
 */
let base = {
  // 赛事接口
  // api_live: 'http://39.96.78.190/test111/eos/api.php',
  api_live : './mock',
  // 球队logo地址
  // 足球：+'/football/team/'+ Mid +'.png'
  // 篮球：+'/basketball/team/'+'Mid'+'.png'
  img: 'http://www.misports.cn/images'
}
// 环境的切换 启用本地 mock 数据
if (process.env.NODE_ENV == 'development') {
  base.api_live = './mock'
}
//  else if (process.env.NODE_ENV == 'debug') {
//
// } else if (process.env.NODE_ENV == 'production') {
//
// }
export default base;