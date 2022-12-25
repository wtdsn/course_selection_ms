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
