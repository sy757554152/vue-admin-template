import request from '@/utils/request'
export function show(data) {
  return request({
    url: '/teacher/show',
    method: 'get',
    params: {
      teacherNumber: data.number,
      teacherName: data.name
    //   state: data.state,
    //   institue: data.institute[0],
    //   major: data.institute[1]
    }
  })
}
export function change(data) {
  return request({
    url: '/teacher/change',
    method: 'post',
    data: {
      teacherName: data.teacherName,
      teacherNumber: data.teacherNumber,
      sex: data.sex,
      IdCard: data.IdCard,
      political: data.political,
      phone: data.phone,
      institute: data.institute[0],
      education: data.education,
      university: data.university,
      joinTime: data.joinTime
    }
  })
}
export function dele(data) {
  return request({
    url: '/teacher/dele',
    method: 'post',
    data: {
      teacherNumber: data.teacherNumber
    }
  })
}
