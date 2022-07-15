import request from '@/utils/request'

/**
 *
 * @param {string} mobile //手机号
 * @param {string} code //密码
 * @returns
 */
export const login = (mobile, code) =>
  request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
/**
 *
 * @param {string} mobile
 * @returns
 */
export const SendCode = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`
  })
