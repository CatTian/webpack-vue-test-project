import axios from 'axios'
import router from './router'
import i18n from './i18n'

const loadedLanguages = ['en'] // our default language that is prelaoded

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang // 设置请求头部
  document.querySelector('html').setAttribute('lang', lang) // 根元素增加lang属性
  return lang
}

export function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import ( /* webpackChunkName: "lang-[request]" */ `@/languages/lib/${lang}`).then(msgs => {
        console.log(msgs);
        i18n.setLocaleMessage(lang, msgs)
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
  const lang = to.params.lang || i18n.locale
  console.log(lang);
  loadLanguageAsync(lang).then(() => next())
})
