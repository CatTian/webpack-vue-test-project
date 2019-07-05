import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入状态管理
import store from './store'
// 导入i18n
import i18n from './i18n'
// 根据设备屏幕比设置根元素字体大小
import './viewport'
import axios from './axios'
// 将axios挂载到vue的原型上
Vue.prototype.$axios = axios

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 环境的切换 启用 mock拦截数据 数据
if (process.env.NODE_ENV == 'development') {
  require('@/mock')
}