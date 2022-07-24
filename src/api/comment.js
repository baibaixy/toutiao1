import request from '@/utils/request'

export const getArtComment = (type, id, comId) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source: id,
      offset: comId
    }
  })
}

/**
 *
 * @param {string} target
 * @param {string} content
 * @param {string} id
 * @returns
 */
export const setArtComment = (target, content, id) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: id
    }
  })
}

/**
 *
 * @param {*} target
 * @param {*} content
 * @param {*} id
 * @returns
 */
export const setArtLiking = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *
 * @param {*} target
 * @returns
 */
export const delArtLiking = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
