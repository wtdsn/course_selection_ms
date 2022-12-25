<script setup lang="ts">
import useRouterStore from '@/stores/route'
import { useUser } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Icon } from '@iconify/vue'
import { logOutApi } from '@/api/login'
const router = useRouter()
function logout() {
  logOutApi()
  const routerSore = useRouterStore()
  const uerStore = useUser()

  routerSore.resetRoutes()
  uerStore.clearInof()
  localStorage.removeItem('isLogin')
  router.replace({ name: 'login' })
  ElMessage.success('登出成功')
}
</script>

<template>
  <div class="header_con">
    <div class="title">
      <Icon icon="grommet-icons:system" class="icon" />
      学生选课管理系统
    </div>
    <div class="logout" @click="logout">登出</div>
  </div>
</template>

<style scoped lang="less">
.header_con {
  height: 100%;
  padding: 0 14px;
  .vertiCenter();
  justify-content: space-between;
  background-color: @themeColor;

  .title {
    width: 300px;
    font-size: 20px;
    letter-spacing: 2px;
    font-family: '宋体';
    font-weight: bold;
    color: rgb(249, 249, 250);

    .vertiCenter();

    .icon {
      font-size: 22px;
      padding-right: 8px;
    }
  }

  .logout {
    color: #fff;
    border: 1px solid rgb(255, 255, 255);
    padding: 2px 10px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: @themeColor;
      background-color: rgb(243, 243, 243);
    }
  }
}
</style>
