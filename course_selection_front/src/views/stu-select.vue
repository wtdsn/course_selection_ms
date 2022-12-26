<script setup lang="ts">
import CourseDetail from '@/components/CourseDetail.vue'
import { ElMessage } from 'element-plus'

// API 和 接口
import { getCoursesApi } from '@/api/course'
import type { courseInter, withTotal } from '@/api/course'

import {
  getSelectionsApi,
  addSelectionApi,
  delSelectionApi
} from '@/api/selection'
import type { selectionInter } from '@/api/selection'

// 获取我的选课，在获取课程前
const MySelections = ref<selectionInter[]>([])
const loadingMySel = ref(true)
async function getSelections() {
  loadingMySel.value = true
  let { code, data } = await getSelectionsApi()
  loadingMySel.value = false
  if (code) {
    MySelections.value = data!
    // 为选课设置映射
    setMap()

    // 设置标志位，因为可能此请求晚响应
    handleFlag()
  }
}

// 已选映射
const selectionMap = ref(new Set())
function setMap() {
  selectionMap.value.clear()
  MySelections.value.forEach((v) => {
    selectionMap.value.add(v.courseId)
  })
}

/* 
  获取课程信息
*/
// 变量初始化
const total = ref(0)
const size = 12
const page = ref(1)
const coursesWithFlag = reactive<{
  flags: boolean[]
  courses: courseInter[]
}>({
  flags: [], // 是否已选标志
  courses: [] // 课程列表
})

// 获取课程信息
const loadingCourse = ref(false)
async function getCourses() {
  loadingCourse.value = true
  // 请求数据
  let { code, data } = await getCoursesApi({
    page: page.value,
    size
  })
  loadingCourse.value = false
  // 如果成功，读取数据
  if (code) {
    total.value = (data as withTotal).total
    coursesWithFlag.courses = (data as withTotal).courses
    coursesWithFlag.flags.length = coursesWithFlag.courses.length

    // 设置标志位
    handleFlag()
  }
}

// 换页
watch(page, () => {
  getCourses()
})

// 刷新课程信息
const refreshing = ref(false)
async function refreshCourse() {
  if (refreshing.value) {
    return
  }
  refreshing.value = true
  let w = Date.now()
  await getCourses()
  ElMessage.success('刷新成功')
  w = Date.now() - w
  if (w < 1000) {
    w = 1000 - w
  } else w = 0
  setTimeout(() => {
    refreshing.value = false
  }, w)
}

// 设置选课标志
function handleFlag() {
  if (coursesWithFlag.courses.length) {
    coursesWithFlag.courses.forEach((v, i) => {
      coursesWithFlag.flags[i] = selectionMap.value.has(v.courseId)
    })
  }
}

onMounted(() => {
  // 获取我的选课
  getSelections()
  // 获取课程
  getCourses()
})

// 课程详情
const isShowDetail = ref(false)
const courseDetailData = ref<courseInter>()
function detail(data: courseInter) {
  isShowDetail.value = true
  courseDetailData.value = data
}

// 关闭课程详情
function closeDetail() {
  isShowDetail.value = false
}

// 增加选课
async function addSelection(courseId: number) {
  const { code, msg } = await addSelectionApi(courseId)
  if (code === 1) {
    ElMessage.success(msg)
    getSelections()
  }
}

// 取消选课
async function cancelSelection(id: number) {
  const { code, msg } = await delSelectionApi(id)
  if (code === 1) {
    ElMessage.success(msg)
    getSelections()
  }
}
</script>

<template>
  <div class="course_select_con">
    <section class="left_course">
      <el-table
        :data="coursesWithFlag.courses"
        border
        fit
        style="width: 100%"
        v-loading="loadingCourse"
      >
        <el-table-column prop="name" label="课程名称" min-width="120" />
        <el-table-column prop="teacherName" label="任教教师" min-width="90" />
        <el-table-column prop="place" label="教学地点" min-width="100" />
        <el-table-column prop="time" label="教学时间" min-width="120" />
        <el-table-column prop="curNum" label="已选人数" min-width="100" />
        <el-table-column prop="stuNum" label="可选人数" min-width="100" />
        <el-table-column fixed="right" label="操作" min-width="160">
          <template #default="{ $index, row }">
            <el-button type="success" size="small" @click="detail(row)"
              >详情</el-button
            >
            <el-button
              type="primary"
              size="small"
              :disabled="coursesWithFlag.flags[$index]"
              @click="addSelection(row.courseId)"
              >{{ coursesWithFlag.flags[$index] ? '已选' : '选课' }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        class="pagination"
        v-model:current-page="page"
        v-model:page-size="size"
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
    </section>
    <section class="riht_selection">
      <span class="my_selection_title">我的选课</span>
      <el-table
        :data="MySelections"
        border
        fit
        style="width: 100%"
        v-loading="loadingMySel"
      >
        <el-table-column prop="name" label="课程名称" min-width="100" />
        <el-table-column prop="teacherName" label="任教教师" min-width="90" />
        <el-table-column label="操作" min-width="160">
          <template #default="{ row }">
            <el-button type="success" size="small" @click="detail(row)"
              >详情</el-button
            >
            <el-popconfirm title="确定取消?" @confirm="cancelSelection(row.id)">
              <template #reference>
                <el-button type="info" size="small">取消选课</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <CourseDetail
      title="课程详情"
      @close-detail="closeDetail"
      :is-show="isShowDetail"
      :course="courseDetailData!"
    />
  </div>
</template>

<style scoped lang="less">
.course_select_con {
  margin: 0 auto;
  display: flex;
  height: 100%;
  max-width: 1300px;

  .left_course {
    flex: 1;
    height: 100%;
    max-width: 1000px;
    min-width: 500px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border-top: none;
    margin-right: 10px;

    display: flex;
    flex-direction: column;

    .pagination {
      padding: 4px 0;

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

  .riht_selection {
    width: 350px;
    min-width: 350px;

    .my_selection_title {
      display: inline-block;
      font-weight: bold;
      color: #5a5a5b;
      padding-bottom: 4px;
      padding-left: 4px;
    }
  }
}
</style>
