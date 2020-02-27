import request from '@/utils/request'
export function getCircleData(data) {
  return request({
    url: '/echarts/getcircledata',
    method: 'get',
    params: {
      commentNumber: data
    }
  })
}
export function getStudentData(data) {
  return request({
    url: '/echarts/getstudentdata',
    method: 'get',
    params: {
      studentNumber: data
    }
  })
}
