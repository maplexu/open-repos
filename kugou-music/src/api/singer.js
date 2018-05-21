// 歌手页面的接口

import fetch from 'utils/fetch.js'

export const getSingerList = () => fetch.get('/singer/class?json=true').then(res => res.data)
