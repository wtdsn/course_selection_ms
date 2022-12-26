<script setup lang="ts">
import { ElMessage } from 'element-plus'

// API
import { searchUserApi } from '@/api/user'
import type { stuInfoInter, teaInfoInter } from '@/api/user'

// 查询条件
const type = ref<'student' | 'teacher' | ''>('')

const teaConditions = [
  {
    type: 'all',
    lable: '全部'
  },
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
    type: 'all',
    lable: '全部'
  },
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
  }
]
const condition = ref('')
function resetCondition() {
  condition.value = ''
  tableData.value = undefined
}

onMounted(() => {
  ElMessage.info('请选择查询对象和条件')
})

// 搜索文本
const searchText = ref('')

// 结果
const tableData = ref<stuInfoInter[] | teaInfoInter[]>()

const loading = ref(false)
async function search() {
  if (!type.value) {
    ElMessage.warning('请选择查询类型')
    return
  }
  if (!condition.value) {
    ElMessage.warning('请选择查询条件')
    return
  }
  if (condition.value !== 'all' && !searchText.value) {
    ElMessage.warning('请输入搜索内容')
    return
  }
  loading.value = true
  const { code, msg, data } = await searchUserApi({
    type: type.value,
    condition: condition.value,
    matchText: searchText.value
  })
  loading.value = false
  if (code === 1) {
    ElMessage.success(msg)
    tableData.value = data
  }
}
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
              <el-button type="primary" class="search_icon" @click="search">
                <el-icon><iEpSearch /></el-icon>
              </el-button>
            </template>
          </el-input>
        </div>
      </section>
    </header>
    <div class="table_wrapper">
      <template v-if="type === 'student'">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="name" label="姓名" min-width="160" />
          <el-table-column prop="number" label="学号" min-width="180" />
          <el-table-column prop="gender" label="性别" min-width="80" />
          <el-table-column prop="majorClass" label="专业班级" min-width="180" />
          <el-table-column prop="school" label="学院" min-width="180" />
          <el-table-column prop="session" label="入学届期" min-width="120" />
        </el-table>
      </template>
      <template v-else>
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="name" label="姓名" min-width="160" />
          <el-table-column prop="number" label="学号" min-width="180" />
          <el-table-column prop="gender" label="性别" min-width="80" />
        </el-table>
      </template>
    </div>
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

  .table_wrapper {
    margin-top: 10px;
    border: 1px solid rgb(232, 232, 232);
  }
}
</style>
