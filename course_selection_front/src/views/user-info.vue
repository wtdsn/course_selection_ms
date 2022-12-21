<script setup lang="ts">
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import ChMap from '../ToCH'
const userStore = useUser()
const { auth, name, number, otherInfo } = storeToRefs(userStore)
</script>

<template>
  <el-descriptions class="user_info_con" :column="2" border>
    <!-- 姓名，工学号固定 -->
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">姓名</div>
      </template>
      {{ name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">{{ auth === 'student' ? '学号' : '工号' }}</div>
      </template>
      {{ number }}
    </el-descriptions-item>

    <!-- 其他信息 -->
    <el-descriptions-item v-for="(v, k) in otherInfo" :key="k">
      <template #label>
        <div class="cell-item">{{ ChMap[k] }}</div>
      </template>
      {{ v }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped lang="less">
.user_info_con {
  max-width: 640px;
}
</style>
