import request from '@/utils/request'
export function show(data) {
  return request({
    url: '/admin/show',
    method: 'get',
    params: {
      adminNumber: data.number,
      adminName: data.name
    //   state: data.state,
    //   institue: data.institute[0],
    //   major: data.institute[1]
    }
  })
}
export function change(data) {
  return request({
    url: '/admin/change',
    method: 'post',
    data: {
      adminName: data.adminName,
      adminNumber: data.adminNumber,
      sex: data.sex,
      IdCard: data.IdCard,
      political: data.political,
      phone: data.phone,
      education: data.education,
      university: data.university,
      joinTime: data.joinTime,
      position: data.position
    }
  })
}
export function dele(data) {
  return request({
    url: '/admin/dele',
    method: 'post',
    data: {
      adminNumber: data.adminNumber
    }
  })
}
