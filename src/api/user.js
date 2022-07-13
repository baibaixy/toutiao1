import request from '@/utils/request'

/**
 *
 * @param {*} mobile //手机号
 * @param {*} code //密码
 * @returns
 */
export const login = (mobile, code) =>
  request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
