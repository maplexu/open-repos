import fetch from 'utils/fetch.js'

export const getSeller = () => fetch.get('/api/seller')
