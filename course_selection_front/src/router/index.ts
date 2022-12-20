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

export const adminRouters: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/add-stu',
    children: [
      {
        path: 'add-stu',
        name: 'addStu',
        component: () => import('@/views/admin-add-stu.vue'),
        meta: {
          icon: 'mdi:account-multiple-plus-outline',
          title: '添加学生'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'add-tea',
        name: 'addTea',
        component: () => import('@/views/admin-add-tea.vue'),
        meta: {
          icon: 'mdi:account-plus',
          title: '添加老师'
        }
      }
    ]
  }
]

export const stuRouters: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'stu',
    component: Layout,
    redirect: '/stu-info',
    children: [
      {
        path: 'stu-info',
        name: 'stuInfo',
        component: () => import('@/views/stu-info.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'stu',
    component: Layout,
    children: [
      {
        path: 'stu-select',
        name: 'stuSelect',
        component: () => import('@/views/stu-select.vue')
      }
    ]
  }
]

export const teaRouters: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'tea',
    component: Layout,
    redirect: '/tea-info',
    children: [
      {
        path: 'tea-info',
        name: 'teaInfo',
        component: () => import('@/views/tea-info.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'tea',
    component: Layout,
    children: [
      {
        path: 'tea-publish',
        name: 'teaPublish',
        component: () => import('@/views/tea-publish.vue')
      }
    ]
  }
]

export const addRoutes = function (routers: RouteRecordRaw[]) {
  return routers.map((v) => {
    return router.addRoute(v)
  })
}

export const resetRoutes = function (removers: any[]) {
  for (const i in removers) {
    removers[i]()
  }
}

// icon 使用 iconify 的图标

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: defaultRoutes
})

export default router
