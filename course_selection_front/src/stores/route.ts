import { defineStore } from 'pinia'
import {
  addRoutes,
  resetRoutes,
  defaultRoutes,
  adminRouters,
  stuRouters,
  teaRouters
} from '@/router/index'
import type { RouteRecordRaw } from 'vue-router'

const useRouterStore = defineStore('route', {
  state: () => ({
    routes: defaultRoutes,
    asyncRoutes: [],
    removers: []
  }),
  actions: {
    addRoutes(auth: string) {
      let routes: RouteRecordRaw[] = []
      if (auth === 'admin') {
        routes = adminRouters
      } else if (auth === 'teacher') {
        routes = teaRouters
      } else {
        routes = stuRouters
      }
      this.removers = addRoutes(routes) as any
      this.asyncRoutes = routes as any
      this.routes = [...defaultRoutes, ...routes]
    },
    resetRoutes() {
      resetRoutes(this.removers)
      this.removers.splice(0)
      this.asyncRoutes = []
      this.routes = defaultRoutes
    }
  }
})

export default useRouterStore
