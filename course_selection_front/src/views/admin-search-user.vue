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
  <div class="search_user_con">
    <header class="header">
      <section class="selects">
        <!-- 身份类型 -->
        <el-select
          v-model="type"
          @change="resetCondition"
          placeholder="请选择查询对象类型"
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
        <!-- 查询条件 -->
        <el-select v-model="condition" placeholder="请选择查询条件">
          <el-option
            v-for="item in type === 'student' ? stuConditions : teaConditions"
            :key="item.type"
            :label="item.lable"
            :value="item.type"
          />
        </el-select>
      </section>
      <section class="search_box">
        <div class="mt-4">
          <el-input v-model="searchText" placeholder="请输入搜索内容">
            <template #append>
              <el-button type="primary" class="search_icon">
                <el-icon><iEpSearch /></el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
      </section>
    </header>
    <div class="result">table</div>
  </div>
</template>

<style scoped lang="less">
.search_user_con {
  width: 100%;
  height: 100%;
  min-width: 620px;

  .header {
    display: flex;
    justify-content: space-between;

    .selects {
      .el-select {
        margin-left: 10px;
        width: 180px;

        &:first-child {
          margin-left: 0;
        }
      }
    }

    .search_icon {
      .allCenter();
      font-size: 18px;

      color: #fff;
      background-color: #4ca0e9;

      border-radius: 0;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;

      &:hover {
        background-color: #96c8f4;
      }
    }
  }

  .result {
    margin-top: 10px;
    background-color: pink;
    max-height: 90%;
    min-height: 300px;
  }
}
</style>
