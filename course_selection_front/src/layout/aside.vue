<script setup lang="ts">
import { toRefs, defineProps, watchEffect, ref } from 'vue'
import userRouteStore from '@/stores/route'
import type { RouteRecordRaw } from 'vue-router'
import { useRoute } from 'vue-router'

import MenuItem from './menuItem.vue'
import type { menuItem } from './menuItem.vue'

// 折叠
const props = defineProps<{ isCollapse: boolean }>()
const { isCollapse } = toRefs(props)

// 路由 - 菜单
const routeStore = userRouteStore()
const route = useRoute()

const menuData = ref<menuItem[]>([])
watchEffect(() => {
  menuData.value = generateRoutes('', routeStore.routes)
})

// 生成路由菜单
function generateRoutes(
  prePath: string,
  routes: readonly RouteRecordRaw[]
): menuItem[] {
  let res: menuItem[] = []
  for (let i = 0, l = routes.length; i < l; i++) {
    let route = routes[i]
    let _prePath = prePath
    // 此路由不显示
    if (route?.meta?.hidden) {
      continue
    }
    // 如果有 childre
    if (route.children) {
      let item = route

      if (route.children.length === 1 && !route?.meta?.show) {
        _prePath += route.path
        item = route.children[0]
        if (item?.meta?.hidden) continue
      }

      let r: menuItem = {
        path: _prePath + item.path,
        title: item.meta.title as string
      }
      if (item.meta.icon) {
        r.icon = item.meta.icon as string
      }
      if (item.children) {
        r.children = generateRoutes(r.path, item.children)
      }
      res.push(r)
    } else {
      // 如果没有 children
      let r: menuItem = {
        path: _prePath + route.path,
        title: route.meta.title as string
      }
      if (route.meta.icon) {
        r.icon = route.meta.icon as string
      }
      res.push(r)
    }
  }
  return res
}

</script>

<template>
  <div class="aside_con" :class="isCollapse ? 'fold_menu' : 'open_menu'">
    <el-menu
      :default-active="route.path"
      class="my_menu"
      :collapse="isCollapse"
      router
    >
      <MenuItem :menu-data="menuData" />
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.aside_con {
  position: relative;
  height: 100%;

  .my_menu {
    height: 100%;
  }
}

.fold_menu {
  width: 63px;
  // 注意，这是需要关闭时的
  transition: width 0.3s;
}

.open_menu {
  width: 180px;
  // 这是打开时的，有延迟
  transition: width 0.3s 0.3s;
}
</style>
