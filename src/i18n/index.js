import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import VueI18n from 'vue-i18n'
import messages from '@/languages' // 语言包的地址，随项目本身设置修改
import navLang from '@/i18n/getNavigatorLang'
import docCookies from "@/assets/js/cookies"
import Store from '@/store'
Vue.use(VueI18n);

// 获取cookies里的语言环境否则启用浏览器默认语言化境
const cookiesLang = docCookies.getItem('lang')||navLang
const i18n = new VueI18n({
  locale: cookiesLang,
  fallbackLocale: cookiesLang,
  silentTranslationWarn: true, //没有的key值不发出警告
  missing() { //没有key值时应如何处理
    return "";
  },
  messages
})

const loadedLanguages = [cookiesLang] // our default language that is prelaoded

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang // 设置请求头部
  document.querySelector('html').setAttribute('lang', lang) // 根元素增加lang属性
  return lang
}

export function loadLanguageAsync(lang) {
  // console.log(lang);
  if (i18n.locale == lang) {
    if (!loadedLanguages.includes(lang)) {
      return import ( /* webpackChunkName: "lang-[request]" */ `@/languages/lib/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

// 在vue-router的beforeEach的全局钩子了处理
router.beforeEach((to, from, next) => {
  // 重制订单参数、投注板状态
  Store.commit('initParams')
  if (Store.state.betFlag) {
    Store.commit('changeBetFlag', false)
  }
  // 重制筛选数组
  Store.commit('initFilterArr')
  const lang = to.params.lang || i18n.locale
  loadLanguageAsync(lang).then(() => next())
})

export default i18n
