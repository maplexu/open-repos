// 排行页面的接口

import fetch from 'utils/fetch.js'

export const getRankList = () => fetch.get('/rank/list?json=true').then(res => res.data)
