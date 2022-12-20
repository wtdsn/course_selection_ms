<script setup lang="ts">
import { ref } from 'vue'
import Header from './header.vue'
import Aside from './aside.vue'

const isCollapse = ref(false)
let toggleIsColl = function (flag: boolean) {
  isCollapse.value = flag
}
</script>
<template>
  <div class="layout_container">
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-container>
        <el-aside class="aside">
          <div class="fold_toggler">
            <div class="circle" @click="toggleIsColl(false)" v-if="isCollapse">
              <iEpDArrowRight />
            </div>
            <div class="circle" @click="toggleIsColl(true)" v-else>
              <iEpDArrowLeft />
            </div>
          </div>
          <Aside :isCollapse="isCollapse" />
        </el-aside>
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
    position: relative;
    /*     width: 200px; */
    width: fit-content;
    height: calc(100vh - 48px);
    overflow: visible;

    &:hover {
      .fold_toggler {
        display: block !important;
      }
    }

    .fold_toggler {
      display: none;
      position: absolute;
      z-index: 99;
      right: -14px;
      top: 100px;

      .circle {
        height: 28px;
        width: 28px;
        background-color: rgb(217, 238, 246);
        border: 1px solid @themeColor;
        border-radius: 50%;
        cursor: pointer;

        .allCenter();

        &:hover {
          color: @themeColor;
        }
      }
    }
  }
}
</style>
