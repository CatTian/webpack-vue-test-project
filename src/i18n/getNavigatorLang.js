// 根据浏览器语言环境匹配本地文件名
function getLang() {
  var lang = (navigator.language || navigator.userLanguage).toLowerCase();
  if (!lang.match(/zh/)) { // 英文（中文环境全部显示英文）
    return 'en'
  } else if (lang.match(/tw|hk/)) { // 繁体
    return 'tw'
  } else if (lang === 'zh' || lang === 'zh-cn') { // 简体
    return 'cn'
  } else { // 设置默认语言（检测不要语言环境--比如华为移动端不知道为什么匹配不到语言环境。。。）
    return 'cn'
  }
}
const navLang = getLang()

export default navLang
