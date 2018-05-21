// 获取详情列表的接口

import fetch from 'utils/fetch'

export const getRankData = id => fetch.get(`/rank/info/${id}?json=true`).then(res => res.data)
export const getPlistData = id => fetch.get(`/plist/list/${id}?json=true`).then(res => res.data)
export const getSingerData = id => fetch.get(`/singer/list/${id}?json=true`).then(res => res.data)
