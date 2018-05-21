import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import newSongs from '@/view/newSongs'
import rank from '@/view/rank'
import plist from '@/view/plist'
import singer from '@/view/singer'
import searchPage from '@/view/search'
import detailList from '@/view/detailList'

// 引入公共组件
import navBar from '@/components/navBar'
import backBar from '@/components/backBar'
import backBar2 from '@/components/backBar2'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '新歌',
      components: {
        nav: navBar,
        default: newSongs
      }
    },
    {
      path: '/rank',
      name: '排行',
      components: {
        nav: navBar,
        default: rank
      }
    },
    {
      path: '/plist',
      name: '歌单',
      components: {
        nav: navBar,
        default: plist
      }
    },
    {
      path: '/singer',
      name: '歌手',
      components: {
        nav: navBar,
        default: singer
      }
    },
    {
      path: '/search',
      name: '搜索',
      components: {
        nav: backBar,
        default: searchPage
      }
    },
    {
      path: '/detailList',
      name: '列表详情页面',
      components: {
        nav: backBar2,
        default: detailList
      }
    }
  ]
})
