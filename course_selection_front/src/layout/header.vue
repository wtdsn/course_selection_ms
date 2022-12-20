<script setup lang="ts"></script>

<template>
  <div class="header_con">
    <div class="title">
      <iMdiAccountStudent class="icon" />学生选课管理系统
    </div>
    <div class="logout">登出</div>
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
      font-size: 26px;
      padding-right: 6px;
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
