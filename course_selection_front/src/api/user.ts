import { request } from '@/utils/request'

// 获取用户信息
export interface userInfoInter {
  auth: string
  name: string
  number: string
  userId: number
  [key: string]: any
}
export function getUserInfoApi() {
  return request<userInfoInter>({
    url: '/get-info',
    method: 'GET'
  })
}

// 查询
interface searchInter {
  type: 'student' | 'teacher'
  condition: string
  matchText?: string
}
export interface stuInfoInter {
  name: string
  number: string
  gender: string
  majorClass: string
  school: string
  session: string
}

export interface teaInfoInter {
  name: string
  number: string
  gender: string
}

export function searchUserApi(params: searchInter) {
  return request<stuInfoInter[] | teaInfoInter[]>({
    url: '/admin/search',
    method: 'GET',
    params
  })
}

export function addStuApi(data: stuInfoInter) {
  return request({
    url: '/admin/add-stu',
    method: 'POST',
    data
  })
}

export function addTeaApi(data: teaInfoInter) {
  return request({
    url: '/admin/add-tea',
    method: 'POST',
    data
  })
}
