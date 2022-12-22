import { request } from '@/utils/request'
/* import type { responseType } from '@/utils/request' */

interface loginData {
  number: string | number
  pw: string | number
  auth: string
}
interface resultData {
  name: string
}
export function loginApi(data: loginData) {
  return request<resultData>({
    url: '/login',
    method: 'POST',
    data
  })
}

export function logOutApi() {
  return request({
    url: '/logout',
    method: 'GET'
  })
}
