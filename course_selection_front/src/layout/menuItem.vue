<script setup lang="ts">
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue'

export interface menuItem {
  path: string
  icon?: string
  title: string
  children?: menuItem[]
}

const props = defineProps<{
  menuData: menuItem[]
}>()
</script>

<template>
  <template v-for="v in props.menuData" :key="v.path">
    <el-sub-menu v-if="v.children" :index="v.path">
      <template #title>
        <el-icon v-if="v.icon">
          <Icon :icon="v.icon" />
        </el-icon>
        <span>{{ v.title }}</span>
      </template>
      <!-- 递归 -->
      <MenuItem :menuData="v.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="v.path">
      <el-icon v-if="v.icon">
        <Icon :icon="v.icon" />
      </el-icon>
      <span>{{ v.title }}</span>
    </el-menu-item>
  </template>
</template>
