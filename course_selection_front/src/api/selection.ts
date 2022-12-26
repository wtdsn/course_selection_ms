import { request } from '@/utils/request'

export interface selectionInter {
  id: number
  name: string
  courseId: number
  credit: number
  creditHours: number
  introduce: string
  teacherId: number
  place: string
  time: string
  stuNum: number
  teacherName: string
}

export function getSelectionsApi() {
  return request<selectionInter[]>({
    url: '/stu/get-selections',
    method: 'GET'
  })
}

// 增加选课
export function addSelectionApi(courseId: number) {
  return request({
    url: '/stu/add-selection',
    method: 'POST',
    data: { courseId }
  })
}

// 取消选课
export function delSelectionApi(id: number) {
  return request({
    url: '/stu/del-selection',
    method: 'POST',
    data: { id }
  })
}
