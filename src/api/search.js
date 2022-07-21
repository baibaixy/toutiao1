import request from '@/utils/request'
import storage from '@/utils/storage'

export const getSearchSuggestions = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchResult = (q, page) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page,
      per_page: 10
    }
  })
}
const SEARCH_HISTORY = 'HEIMA_SEARCHHISTORY'
export const getHistoryBylocal = () => storage.get(SEARCH_HISTORY)
export const setHistoryTolocal = (keywords) =>
  storage.set(SEARCH_HISTORY, keywords)
export const removeHistoryTolocal = () => storage.remove(SEARCH_HISTORY)
