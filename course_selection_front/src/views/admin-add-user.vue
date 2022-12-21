<script setup lang="ts">
import { ref } from 'vue'
import toCH from '../ToCH'
// 查询条件
const type = ref('')

function resetCondition() {
  condition.value = ''
}
const teaConditions = [
  {
    type: 'name',
    lable: '姓名'
  },
  {
    type: 'number',
    lable: '工号'
  }
]

const stuConditions = [
  {
    type: 'name',
    lable: '姓名'
  },
  {
    type: 'number',
    lable: '学号'
  },
  {
    type: 'session',
    lable: '届期'
  },
  {
    type: 'school',
    lable: '学院'
  }
]
const condition = ref('')

// 搜索
const searchText = ref('')
</script>

<template>
  <div class="add_user_con">
    <header class="header">
      <!-- 身份类型 -->
      <el-select
        v-model="type"
        @change="resetCondition"
        placeholder="请选择添加类型"
      >
        <el-option
          v-for="item in [
            { type: 'student', lable: '学生' },
            { type: 'teacher', lable: '教师' }
          ]"
          :key="item.type"
          :label="item.lable"
          :value="item.type"
        />
      </el-select>

      <!-- 批量添加 -->
      <el-button type="primary">批量添加</el-button>
    </header>
    <div class="add_form">Form</div>
  </div>
</template>

<style scoped lang="less">
.add_user_con {
  width: 100%;
  height: 100%;
  min-width: 620px;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .add_form {
    margin-top: 10px;
    background-color: pink;
    max-height: 90%;
    min-height: 300px;
  }
}
</style>
