import { defineStore } from 'pinia'
import {
  addRouters,
  defaultRoutes,
  adminRouters,
  stuRouters,
  teaRouters
} from '@/router/index'
import type { RouteRecordRaw } from 'vue-router'

const userRouteStore = defineStore('route', {
  state: () => ({
    routes: adminRouters,
    addRoutes: []
  }),
  actions: {
    addRouters(auth) {
      let addRoutes: RouteRecordRaw[] = []
      if (auth === 'admin') {
        addRoutes = adminRouters
      } else if (auth === 'teacher') {
        addRoutes = teaRouters
      } else {
        addRoutes = stuRouters
      }
      addRouters(addRoutes)
      this.addRoutes = addRoutes
      this.routes = [...defaultRoutes, ...addRoutes]
    }
  }
})

export default userRouteStore
