import request from '@/utils/request'
export function addHomework(data) {
  return request({
    url: '/homeworkTeacher/addHomework',
    method: 'post',
    data: {
      title: data.title,
      answer: data.answer,
      claim: data.claim,
      teacherNumber: data.teacherNumber,
      teacherName: data.teacherName,
      score: data.score,
      state: data.state,
      institute: data.institute[0],
      major: data.institute[1],
      class: data.class
    }
  })
}
export function getTeacher(data) {
  return request({
    url: '/homeworkTeacher/getTeacher',
    method: 'get',
    params: {
      teacherNumber: data
    }
  })
}
