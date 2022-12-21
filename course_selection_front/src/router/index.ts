import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found.vue'),
    meta: {
      hidden: true
    }
  }
]

// icon 使用 iconify 的图标
export const adminRouters: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/search-user',
    children: [
      {
        path: 'search-user',
        name: 'searchUser',
        component: () => import('@/views/admin-search-user.vue'),
        meta: {
          icon: 'material-symbols:person-search-outline',
          title: '查询用户'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'add-user',
        name: 'addUser',
        component: () => import('@/views/admin-add-user.vue'),
        meta: {
          icon: 'mdi:account-multiple-plus-outline',
          title: '添加用户'
        }
      }
    ]
  }
]

export const stuRouters: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/stu-info',
    children: [
      {
        path: 'stu-info',
        name: 'stuInfo',
        component: () => import('@/views/user-info.vue'),
        meta: {
          icon: 'ph:student',
          title: '我的信息'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'stu-select',
        name: 'stuSelect',
        component: () => import('@/views/stu-select.vue'),
        meta: {
          icon: 'carbon:data-class',
          title: '选课'
        }
      }
    ]
  }
]

export const teaRouters: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/tea-info',
    children: [
      {
        path: 'tea-info',
        name: 'teaInfo',
        component: () => import('@/views/user-info.vue'),
        meta: {
          icon: 'ph:chalkboard-teacher',
          title: '我的信息'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'tea-publish',
        name: 'teaPublish',
        component: () => import('@/views/tea-publish.vue'),
        meta: {
          icon: 'material-symbols:add-chart-rounded',
          title: '选课发布'
        }
      }
    ]
  }
]

// 增加路由，并且收集返回值。用于删除路由
export const addRoutes = function (routers: RouteRecordRaw[]) {
  return routers.map((v) => {
    return router.addRoute(v)
  })
}

// 遍历 addRoute 的返回值，删除路由
export const resetRoutes = function (removers: any[]) {
  for (const i in removers) {
    removers[i]()
  }
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: defaultRoutes
})

export default router
