// 搜索页面的接口

import fetch from 'utils/fetch.js'

export const getSearchList = () => fetch.get('/search/index?json=true').then(res => res.data)
