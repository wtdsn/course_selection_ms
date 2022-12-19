<script setup lang="ts">
import Header from './header.vue'
import Aside from './aside.vue'
</script>
<template>
  <div class="layout_container">
    <el-container>
      <el-header class="header"><Header /></el-header>
      <el-container>
        <el-aside width="200px" class="aside"><Aside /></el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.layout_container {
  width: 100vw;
  height: 100vh;

  position: relative;
  .header {
    height: 48px;
    padding: 0;
  }
  .aside {
    height: calc(100vh - 48px);
  }
}
</style>
