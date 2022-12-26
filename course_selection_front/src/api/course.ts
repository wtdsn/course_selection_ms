import { request } from '@/utils/request'

/* 获取课程 */
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

/* 增加课程 */
export interface addCourseInter {
  name: string
  credit: string
  creditHours: string
  introduce: string
  place: string
  time: string
  stuNum: number | undefined
}

export function addCourseApi(data: addCourseInter) {
  return request({
    url: '/tea/add-course',
    method: 'POST',
    data
  })
}

export function modifyCourseApi(data: courseInter) {
  return request({
    url: '/tea/update-course',
    method: 'POST',
    data
  })
}

export function delCourseApi(courseId: number) {
  return request({
    url: '/tea/del-course',
    method: 'POST',
    data: { courseId }
  })
}
