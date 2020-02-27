import request from '@/utils/request'
export function getComment(data) {
  return request({
    url: '/studentview/getcomment',
    method: 'get',
    params: {
      homeworkId: data.homeworkId,
      commentNumber: data.commentNumber,
      teacherflag: true
    }
  })
}
