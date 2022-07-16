import storage from './storage'
const TOKEN_KEY = 'HEIMA_TOUTIAO_TOKEN'
export const getToken = () => storage.get(TOKEN_KEY)
export const setToken = (key) => storage.set(TOKEN_KEY, key)
export const removeToken = () => storage.remove(TOKEN_KEY)
