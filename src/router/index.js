import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/fblist',
    name: 'fblist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "about" */ '@/views/fbList/index.vue')
  },
  {
    path: '/fbSingle',
    name: 'fbSingle',
    component: () =>
        import ( /* webpackChunkName: "about" */ '@/views/fbSingle/index.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () =>
        import ( /* webpackChunkName: "about" */ '@/views/help/Help.vue')
  }
  ]
})
