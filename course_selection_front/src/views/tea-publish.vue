<script setup lang="ts">
import { getCoursesApi } from '@/api/course'
import type { courseInter, withTotal } from '@/api/course'

import CourseDetail from '@/components/CourseDetail.vue'
import { ElMessage } from 'element-plus'

// 全部
const total = ref(0)
const SIZE = 20
const page = ref(1)
const tatalCourses = ref<courseInter[]>([])
const tatalCoursesLaoding = ref(false)

// 获取全部
async function getAllCourse() {
  tatalCoursesLaoding.value = true
  const { code, data } = await getCoursesApi({
    size: SIZE,
    page: page.value
  })
  tatalCoursesLaoding.value = false
  if (code) {
    tatalCourses.value = (data as withTotal).courses
    total.value = (data as withTotal).total
  }
}

// 刷新课程信息
const refreshing = ref(false)
async function refreshCourse() {
  if (refreshing.value) {
    return
  }
  refreshing.value = true
  let w = Date.now()
  await getAllCourse()
  ElMessage.success('刷新成功')
  w = Date.now() - w
  if (w < 1000) {
    w = 1000 - w
  } else w = 0
  setTimeout(() => {
    refreshing.value = false
  }, w)
}

onMounted(() => {
  getAllCourse()
})

// 我创建的课程
const myCourses = ref<courseInter[]>()
const myCoursesLoading = ref(false)
async function getMyCourses() {
  myCoursesLoading.value = true
  const { code, data } = await getCoursesApi({
    self: true
  })
  myCoursesLoading.value = false
  if (code) {
    myCourses.value = data as courseInter[]
  }
}

function tabClick(index: any) {
  if (index == 1) {
    getMyCourses()
  }
}

// 详情显示
const isShowDetail = ref(false)
const courseDetailData = ref<courseInter>()
function detail(data: courseInter) {
  courseDetailData.value = data
  isShowDetail.value = true
}
function closeDetail() {
  isShowDetail.value = false
}

// 修改课程
const modify = ref<courseInter>()
function modifyCourse() {
  isShowDetail.value = true
}

// 增加课程
const create = ref<courseInter>()
function addCourse() {
  isShowDetail.value = true
}

// 确定修改 / 确定删除
function dialogConfirm(type: any) {
  isShowDetail.value = false
  console.log(type)
}
</script>

<template>
  <div class="course_publish_con">
    <el-tabs class="tabs" @tab-change="tabClick">
      <!-- 全部 -->
      <el-tab-pane label="全部课程" class="tab_all_item">
        <el-table
          :data="tatalCourses"
          border
          fit
          style="width: 100%"
          v-loading="tatalCoursesLaoding"
        >
          <el-table-column prop="name" label="课程名称" min-width="120" />
          <el-table-column prop="teacherName" label="任教教师" min-width="90" />
          <el-table-column prop="place" label="教学地点" min-width="100" />
          <el-table-column prop="time" label="教学时间" min-width="120" />
          <el-table-column prop="curNum" label="已选人数" min-width="100" />
          <el-table-column prop="stuNum" label="可选人数" min-width="100" />
          <el-table-column fixed="right" label="操作" min-width="100">
            <template #default="{ row }">
              <el-button type="success" size="small" @click="detail(row)"
                >详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          v-model:current-page="page"
          v-model:page-size="SIZE"
          layout="total,prev, pager, next, jumper,slot"
          :background="true"
          :total="total"
        >
          <template #default>
            <el-icon
              class="refresh"
              @click="refreshCourse"
              :class="{ refreshing: refreshing }"
            >
              <iEpRefreshRight />
            </el-icon>
          </template>
        </el-pagination>
      </el-tab-pane>

      <!-- 我的 -->
      <el-tab-pane label="我发布的课程">
        <header class="header">
          <span>共：{{ myCourses?.length }}</span>
          <el-button type="primary" @click="addCourse()">增加选课</el-button>
        </header>
        <el-table
          :data="myCourses"
          border
          fit
          style="width: 100%"
          v-loading="myCoursesLoading"
        >
          <el-table-column prop="name" label="课程名称" min-width="120" />
          <el-table-column prop="place" label="教学地点" min-width="100" />
          <el-table-column prop="time" label="教学时间" min-width="120" />
          <el-table-column prop="curNum" label="已选人数" min-width="100" />
          <el-table-column prop="stuNum" label="可选人数" min-width="100" />
          <el-table-column fixed="right" label="操作" min-width="200">
            <template #default="{ row }">
              <el-button type="success" size="small" @click="detail(row)"
                >详情
              </el-button>
              <el-button type="warning" size="small" @click="detail(row)"
                >修改
              </el-button>
              <el-button type="danger" size="small" @click="detail(row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <CourseDetail
      :is-show="isShowDetail"
      @closeDetail="closeDetail"
      @confirm="dialogConfirm"
      :course="courseDetailData"
      :create="create"
      :modify="modify"
      title="课程详情"
    />
  </div>
</template>

<style scoped lang="less">
.course_publish_con {
  height: 100%;
  margin: 0 auto;
  max-width: 1200px;

  .tabs {
    .pagination {
      padding: 4px 2px;

      .refresh {
        margin-left: 30px;
        margin-top: 1px;

        background-color: #edf4fe;
        padding: 4px;
        border-radius: 2px;
        font-size: 22px;
        cursor: pointer;
      }

      .refreshing {
        background-color: transparent;
        animation: rotating 1s linear infinite;
      }

      @keyframes rotating {
        0% {
          transform: scale(1.1) rotate(0deg);
        }
        100% {
          transform: scale(1.1) rotate(360deg);
        }
      }
    }
  }
  .header {
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .list {
    width: 100%;
    min-height: 300px;
    max-height: 90%;
    background-color: aqua;
  }
}
</style>
<style lang="less">
.course_publish_con {
  .tabs {
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-tabs__content {
      flex: 1;
      height: 100%;
    }
    .tab_all_item {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
