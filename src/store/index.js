import Vue from 'vue'
import Vuex from 'vuex'
import navLang from '@/i18n/getNavigatorLang'

// 通过在根实例中注册 store 选项，
// 该 store 实例会注入到根组件下的所有子组件中，
// 且子组件能通过 this.$store 访问到
// 不好好读文档会后悔系列...
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navLang,
    // 订单参数 【post】
    betParams: {
      s: '',
      Mid: '',
      Live: '',
      Pool: '',
      Line: '',
      Key: '',
      Value: '',
      Score: '',
      Currency: 'usd'
    },
    teamName: {
      home: '',
      away: '',
      pool: ''
    },
    betFlag: false,
    user: {
      id: 'xxx',
      token: 'xxx',
      balance: '-'
    },
    tips: {
      states: false,
      value: ''
    },
    filterArr: []
  },
  mutations: { // 同步
    setNewLang(state, newKey) {
      state.navLang = newKey
    },
    initParams(state) {
      // 初始化订单参数
      state.betParams = {
        s: '',
        Mid: '',
        Live: '',
        Pool: '',
        Line: '',
        Key: '',
        Value: '',
        Score: '',
        Currency: 'usd'
      }
      // 初始化赛事名
      state.teamName = {
        home: '',
        away: '',
        pool: ''
      }
    },
    // change betFlag
    changeBetFlag(state, flag) {
      state.betFlag = flag
      if (!flag) {
        document.body.style.paddingBottom = 0
      }
    },
    setTips(state, tip) {
      state.tips.states = true
      state.tips.value = tip
      setTimeout(() => {
        state.tips.states = false
      }, 50)
    },
    updataBalance(state, balance) {
      state.user.balance = balance
    },
    initUser(state, user) {
      state.user.id = user.id
      state.user.balance = user.balance
      state.user.token = user.token
    },
    initFilterArr(state) {
      state.filterArr = []
    }
  },
  actions: { // 异步

  }
})
