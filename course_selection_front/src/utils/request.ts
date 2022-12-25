import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import baseURL from '@/api/baseURL'

import { useUser } from '@/stores/user'
import useRouterStore from '@/stores/route'
import { useRouter } from 'vue-router'

const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // you can add token here
    // config.headers.token = token

    return config
  },
  (err) => {
    console.log('请求拦截异常！')
    return Promise.reject(err)
  }
)

// 定义返回
export interface responseType<T = unknown> {
  code: number
  msg: string
  data?: T
  [key: string]: unknown
}
// code 1 ， 操作成功 ， code 2 操作失败 ， code 3 其他情况

instance.interceptors.response.use(
  // 把错误处理放在这里，而不是放在 request , 是考虑到有些请求
  // 比如 请求返回类型是 bold 时
  (res: AxiosResponse<responseType>): AxiosResponse<responseType> => {
    // 全局错误提示
    if (res.data.code === 2) {
      console.error(res.data.msg)
      // Message
      ElMessage.error(res.data.msg)
    }
    return res
  },
  (err: AxiosError) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log('400')
          break
        case 401:
          ;(() => {
            const userStore = useUser()
            const routerStore = useRouterStore()
            const router = useRouter()
            routerStore.resetRoutes()
            ElMessageBox.confirm('登录超时，请重新登录', 'Warning', {
              confirmButtonText: '确定',
              type: 'warning',
              center: true,
              callback: () => {
                userStore.clearInof()
                router.replace({
                  name: 'login'
                })
              }
            })
          })()

          break
        case 500:
          console.log('参数错误或服务器出错')
          break
        default:
          break
      }
    }
    return Promise.reject(err)
  }
)

// 取出结果的 data
export async function request<T = unknown>(
  config: AxiosRequestConfig
): Promise<responseType<T>> {
  try {
    const res = await instance(config)
    return res.data
  } catch (err) {
    console.log(err)
    return { code: 0, msg: '请求错误' }
  }
}

export default instance
