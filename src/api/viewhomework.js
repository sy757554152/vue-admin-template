import request from '@/utils/request'
export function show(data) {
  return request({
    url: '/viewhomework/show',
    method: 'get',
    params: {
      state: data.state,
      institute: data.institute,
      major: data.major,
      class: data.class
    }
  })
}
export function addVideo(fd) {
  return request({
    url: '/dev-api/viewhomework/addViedo',
    method: 'post',
    data: fd
  })
}
