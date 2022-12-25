import router from './index'
import useRouterStore from '@/stores/route'
import { useUser } from '@/stores/user'

router.beforeEach(async (to, from) => {
  const isLogin = localStorage.getItem('isLogin')
  // 如果没有登录 , 不是跳转 login
  if (!isLogin && to.name !== 'login') {
    return { name: 'login' }
  }

  const userStore = useUser()
  const routerStore = useRouterStore()

  // 如果已经登录
  if (isLogin) {
    if (!userStore.auth) {
      // 没有权限，身份丢失，重新获取身份
      routerStore.resetRoutes()
      const auth = await userStore.getInfo()
      if (auth) {
        routerStore.addRoutes(auth)
        return { path: '/' }
      } else {
        localStorage.removeItem('isLogin')
        return { name: 'login' }
      }
    }

    // 有权限时，如果没有路由
    if (!routerStore.asyncRoutes.length) {
      // 需要生成路由
      routerStore.addRoutes(userStore.auth)
      return { path: '/' }
    } else {
      if (to.name === 'login') {
        return { path: '/' }
      }
    }
  }
})
