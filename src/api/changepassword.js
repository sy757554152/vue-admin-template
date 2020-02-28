import request from '@/utils/request'

export function getUserInfo(data,password) {
  return request({
    url: '/admin/getuserinfo',
    method: 'get',
    params: {
      number: data,
      password: password
    }
  })
}
export function addnewAdmin(data) {
  return request({
    url: '/admin/changepassword',
    method: 'post',
    data: data
  })
}
