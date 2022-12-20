import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      hidden: true
    }
  },
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
    path: '/admin',
    component: Layout,
    redirect: '/admin/add-stu',
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
    path: '/admin',
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
    path: '/stu',
    component: Layout,
    redirect: '/stu/stu-info',
    children: [
      {
        path: 'stu-info',
        name: 'stuInfo',
        component: () => import('@/views/stu-info.vue')
      },
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
    path: '/tea',
    component: Layout,
    redirect: '/tea/tea-info',
    children: [
      {
        path: 'tea-info',
        name: 'teaInfo',
        component: () => import('@/views/tea-info.vue')
      },
      {
        path: 'tea-publish',
        name: 'teaPublish',
        component: () => import('@/views/tea-publish.vue')
      }
    ]
  }
]

export const addRouters = function (routers: RouteRecordRaw[]) {
  for (const key in routers) {
    router.addRoute(routers[key])
  }
}

// icon 使用 iconify 的图标
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: defaultRoutes
})

addRouters(adminRouters)

export default router
