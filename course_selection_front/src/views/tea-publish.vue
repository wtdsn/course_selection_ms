<script setup lang="ts"></script>

<template>
  <div class="course_publish_con">
    <header class="header">
      <div class="title">我发布的选课</div>
      <el-button type="primary">增加选课</el-button>
    </header>
    <div class="list"></div>
  </div>
</template>

<style scoped lang="less">
.course_publish_con {
  height: 100%;
  margin: 0 auto;
  max-width: 1200px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }

  .list {
    width: 100%;
    min-height: 300px;
    max-height: 90%;
    background-color: aqua;
  }
}
</style>
