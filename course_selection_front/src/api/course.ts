import { request } from '@/utils/request'

interface getCParams {
  self?: boolean
  size?: number
  page?: number
}

export interface courseInter {
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
  curNum: number
}

export interface withTotal {
  total: number
  courses: courseInter[]
}

export function getCoursesApi(
  params: getCParams = {
    size: 20,
    page: 1
  }
) {
  return request<courseInter[] | withTotal>({
    url: '/get-course',
    method: 'GET',
    params
  })
}
