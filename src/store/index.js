import Vue from 'vue'
import Vuex from 'vuex'
import navLang from '@/i18n/getNavigatorLang'

// 通过在根实例中注册 store 选项，
// 该 store 实例会注入到根组件下的所有子组件中，
// 且子组件能通过 this.$store 访问到
// 不好好读文档会后悔系列...
Vue.use(Vuex)

// 订单参数 【post】
let betParams = {
  s: '',
  Mid: '', // 球队id
  Live: '', // 滚球1，否则0
  Pool: '', // 玩法名称
  Line: '', // 让分线
  Key: '', // 玩法选项
  Value: '', // 玩法赔率
  Score: '', // 投注金额
  Currency: 'usd' // 币种：默认
};
// 投注框中的球队信息
let teamName = {
  home: '', // 主队名
  away: '', // 客队名
  pool: '' // 玩法名称
};
export default new Vuex.Store({
  state: {
    navLang,
    // 订单参数 【post】
    betParams: betParams,
    // 用来显示在投注框中的球队信息
    teamName: teamName,
    betFlag: false, // 投注框显示状态
    user: { // 用户信息
      id: 'xxx',
      token: 'xxx',
      balance: '-' // 用户余额
    },
    tips: {
      states: false, // toast 的显示标示 true显示
      value: '' // toast 的文案
    },
    filterArr: [] // 筛选后需要显示的联赛id
  },
  mutations: { // 同步
    setNewLang(state, newKey) {
      state.navLang = newKey
    },
    initParams(state) {
      // 初始化订单参数
      state.betParams = betParams
      // 初始化赛事名
      state.teamName = teamName
    },
    // 改变投注框状态
    changeBetFlag(state, flag) {
      state.betFlag = flag
      if (!flag) {
        document.body.style.paddingBottom = 0
      }
    },
    // 设置
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
      state.user = user
    },
    initFilterArr(state) {
      state.filterArr = []
    }
  },
  actions: { // 异步

  }
})