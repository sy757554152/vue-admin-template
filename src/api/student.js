import request from '@/utils/request'
export function show(data) {
  return request({
    url: '/student/show',
    method: 'get',
    params: {
      studentNumber: data.number,
      studentName: data.name
    //   state: data.state,
    //   institue: data.institute[0],
    //   major: data.institute[1]
    }
  })
}
export function change(data) {
  return request({
    url: '/student/change',
    method: 'post',
    data: {
      studentName: data.studentName,
      studentNumber: data.studentNumber,
      sex: data.sex,
      IdCard: data.IdCard,
      state: data.state,
      political: data.political,
      phone: data.phone,
      institute: data.institute[0],
      major: data.institute[1],
      class: data.class
    }
  })
}
export function dele(data) {
  return request({
    url: '/student/dele',
    method: 'post',
    data: {
      studentNumber: data.studentNumber
    }
  })
}
