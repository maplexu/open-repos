// 歌单页面的接口

import fetch from 'utils/fetch.js'

export const getPlistList = () => fetch.get('/plist/index?json=true').then(res => res.data)
