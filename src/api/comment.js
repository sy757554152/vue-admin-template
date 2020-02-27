import request from '@/utils/request'
export function show(data) {
  return request({
    url: '/comment/show',
    method: 'get',
    params: {
      state: data.state,
      institute: data.institute,
      major: data.major,
      class: data.class
    }
  })
}
export function getVideo(data) {
  return request({
    url: '/comment/getvideos',
    method: 'get',
    params: {
      studentNumber: data.number,
      flag: false,
      homeworkId: data.homeworkId
    }
  })
}
export function getComment(data) {
  return request({
    url: '/comment/getcomment',
    method: 'get',
    params: {
      homeworkId: data.homeworkId,
      commentNumber: data.number,
      commentName: data.name
    }
  })
}
export function getHomework(data) {
  return request({
    url: '/comment/gethomework',
    method: 'get',
    params: {
      homeworkId: data.homeworkId
    }
  })
}
export function addVideoComment(data) {
  return request({
    url: '/comment/addcomment',
    method: 'post',
    data: {
      commentNumber: data.commentNumber,
      commentName: data.commentName,
      studentNumber: data.studentNumber,
      studentName: data.studentName,
      teacherflag: data.teacherflag,
      homeworkId: data.homeworkId,
      state: data.state,
      institute: data.institute,
      major: data.major,
      class: data.class,
      address: data.address,
      flag: data.flag,
      commentcontent: data.commentcontent,
      commentscore: data.commentscore,
      teacherscore: data.teacherscore,
      tecahercontent: data.tecahercontent,
      time: data.time,
      frequency: data.frequency,
      title: data.title
    }
  })
}
export function changehomework(data) {
  return request({
    url: '/comment/changehomeworkflag',
    method: 'post',
    data: {
      videoId: data._id,
      flag: true
    }
  })
}
export function changeComment(data) {
  return request({
    url: '/comment/changecomment',
    method: 'post',
    data: {
      homeworkId: data.homeworkId,
      commentNumber: data.commentNumber,
      commentName: data.commentName,
      time: data.time,
      frequency: data.frequency,
      commentcontent: data.commentcontent,
      commentscore: data.commentscore
    }
  })
}
