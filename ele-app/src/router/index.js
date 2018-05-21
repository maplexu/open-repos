import Vue from 'vue'
import Router from 'vue-router'
import goods from 'views/goods'
import ratings from 'views/ratings'
import seller from 'views/seller'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: '默认为商品页',
      component: goods
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ]
})
