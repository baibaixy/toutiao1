import request from '@/utils/request'
import storage from '@/utils/storage'
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
export const getAllMyChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 *
 * @param {string|number} target
 * @returns promise
 */
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
/**
 *  添加我的频道
 * @param {*} id  频道id
 * @param {*} seq  频道索引下标
 * @returns
 */
export const addMyChannel = (id, seq) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
const HEIMA_TOUTIAO_CHANNELS = 'HRIMA_TOUTIAO_CHANNELS'
export const getMyChannelsBylocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
export const setMyChannelsTolocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
