<script setup lang="ts">
import {
  getCoursesApi,
  addCourseApi,
  delCourseApi,
  modifyCourseApi
} from '@/api/course'
import type { courseInter, withTotal, addCourseInter } from '@/api/course'

import CourseDetail from '@/components/CourseDetail.vue'
import { ElMessage, ElLoading } from 'element-plus'

// 全部
const total = ref(0)
const SIZE = 10
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

// 页码切换
watch(page, () => {
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
const dialogTitle = ref<'课程详情' | '课程修改' | '增加课程'>('课程详情')
const courseDetailData = ref<courseInter>()
function detail(data: courseInter) {
  dialogTitle.value = '课程详情'
  courseDetailData.value = data
  isShowDetail.value = true
}

// 关闭 Dialog
function closeDetail() {
  isShowDetail.value = false
}

// 修改课程
const modify = ref<courseInter>()
function modifyCourse(data: courseInter) {
  modify.value = data
  dialogTitle.value = '课程修改'
  isShowDetail.value = true
}

async function confirmModify() {
  if (modify.value) {
    let { code, msg } = await modifyCourseApi(modify.value)
    if (code) {
      ElMessage.success(msg)

      // 刷新我的课程
      getMyCourses()
      return true
    }
    return false
  }
  return false
}

// 增加课程
const init: addCourseInter = {
  name: '',
  credit: '',
  creditHours: '',
  introduce: '',
  place: '',
  time: '',
  stuNum: undefined
}
const create = ref<addCourseInter>({
  ...init
})
function addCourse() {
  dialogTitle.value = '增加课程'
  isShowDetail.value = true
}

async function confrimAdd() {
  const { code, msg } = await addCourseApi(create.value)
  if (code) {
    ElMessage.success(msg)
    // 刷新我的课程
    getMyCourses()
    // 重置 crate
    create.value = { ...init }
    return true
  }
  return false
}

// 确定修改 / 确定删除
async function dialogConfirm(type: 'modify' | 'create') {
  // loading
  const loadingInstance = ElLoading.service({
    target: '#courseDialog',
    background: 'rgba(250,250,250,0.7)',
    text: '处理中...'
  })
  let result: boolean
  if (type === 'modify') {
    result = await confirmModify()
  } else {
    result = await confrimAdd()
  }
  loadingInstance.close()

  // 成功才关闭
  if (result) {
    closeDetail()
  }
}

// 删除我的课程
async function delCourse(courseId: number) {
  const { code, msg } = await delCourseApi(courseId)
  if (code) {
    ElMessage.success(msg)
    getMyCourses()
  }
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
          <el-button type="primary" @click="addCourse()">增加课程</el-button>
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
              <el-button type="warning" size="small" @click="modifyCourse(row)"
                >修改
              </el-button>
              <el-popconfirm
                title="确定删除?"
                @confirm="delCourse(row.courseId)"
              >
                <template #reference>
                  <el-button type="danger" size="small">删除 </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <CourseDetail
      id="courseDialog"
      :is-show="isShowDetail"
      @closeDetail="closeDetail"
      @confirm="dialogConfirm"
      :course="courseDetailData"
      :create="create"
      :modify="modify"
      :title="dialogTitle"
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
