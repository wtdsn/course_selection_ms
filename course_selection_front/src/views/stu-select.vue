<script setup lang="ts"></script>

<template>
  <div class="course_select_con">
    <section class="left_course">选课列表</section>
    <section class="riht_selection">我的选课</section>
  </div>
</template>

<style scoped lang="less">
.course_select_con {
  display: flex;
  height: 100%;

  .left_course {
    flex: 1;
    background-color: pink;
  }

  .riht_selection {
    width: 300px;
    background-color: aqua;
  }
}
</style>
