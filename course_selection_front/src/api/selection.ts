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
