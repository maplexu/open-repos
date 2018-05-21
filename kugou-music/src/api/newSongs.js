// 新歌页面的接口

import fetch from 'utils/fetch.js'

export const getNewSongsList = () => fetch.get('/?json=true').then(res => res.data)
