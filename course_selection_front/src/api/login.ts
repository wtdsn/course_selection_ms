import { request } from '@/utils/request'

interface loginData {
  number: string | number
  pw: string | number
  auth: string
}

export function loginApi(data: loginData) {
  return request({
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
