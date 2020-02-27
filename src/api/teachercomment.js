import request from '@/utils/request'
// export function getTeacherInfo(data) {
//   return request({
//     url: '/teachercomment/search',
//     method: 'get',
//     params: {
//       number: data.number
//     }
//   })
// }
export function getStudentHomework(data) {
  return request({
    url: '/teachercomment/gethomework',
    method: 'get',
    params: {
      number: data.number
    }
  })
}
export function getTeacherComment(data) {
  return request({
    url: '/teachercomment/getteachercomment',
    method: 'get',
    params: {
      homeworkId: data
    }
  })
}
export function changeTeacherComment(data) {
  return request({
    url: '/teachercomment/changeteachercomment',
    method: 'post',
    data: {
      teachercontent:data.teachercontent,
      teacherscore: data.teacherscore,
      commentId: data.commentId,
      flag: data.flag
    }
  })
}
