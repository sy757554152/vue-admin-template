import request from '@/utils/request'

export function addStudent(data) {
  return request({
    url: '/student/addStudent',
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
      class: data.class,
      type: data.type,
      password: data.IdCard.slice(12)
    }
  })
}
export function addTeacher(data) {
  return request({
    url: '/teacher/addTeacher',
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
      joinTime: data.joinTime,
      type: data.type,
      password: data.IdCard.slice(12)
    }
  })
}
export function addAdmin(data) {
  return request({
    url: '/admin/addAdmin',
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
      position: data.position,
      type: data.type,
      password: data.IdCard.slice(12)
    }
  })
}
export function getInstitute() {
  return request({
    url: '/institute/getInstitute',
    method: 'get'
  })
}
