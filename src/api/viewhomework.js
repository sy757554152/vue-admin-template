import request from '@/utils/request'
export function show() {
  return request({
    url: '/viewhomework/show',
    method: 'get'
  })
}
