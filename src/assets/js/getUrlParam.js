/**
 * [getUrlParam 获取URL参数]
 *
 * @param  {[String]} name 参数
 * @param  {[String]} url 目标链接
 * @return {[type]}
 */
function getUrlParam(name, url) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  let r = url ? url.substr(1).match(reg) : window.location.search.substr(1).match(reg)
  if (r !== null) {
    return unescape(r[2])
  }
  return null
}

export default getUrlParam