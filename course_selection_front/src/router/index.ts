import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/not-found.vue')
    }
  ]
})

export const adminRouters: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/add-stu',
    children: [
      {
        path: 'add-stu',
        name: 'addStu',
        component: () => import('@/views/admin-add-stu.vue')
      },
      {
        path: 'add-tea',
        name: 'addTea',
        component: () => import('@/views/admin-add-tea.vue')
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
addRouters(teaRouters)

export default router
