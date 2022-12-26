<script setup lang="ts">
import type { courseInter, addCourseInter } from '@/api/course'
import type { FormInstance } from 'element-plus'

interface propsInter {
  isShow: boolean
  title: '课程详情' | '增加课程' | '课程修改'
  course?: courseInter
  modify?: courseInter
  create?: addCourseInter
}
const props = defineProps<propsInter>()
const isShow = ref(false)
const disabled = ref(true) // 如果是详情，为 true
const courseData = ref<courseInter | addCourseInter>()

// init 数据
watchEffect(() => {
  isShow.value = props.isShow

  switch (props.title) {
    case '课程详情':
      // 查看详情
      disabled.value = !!props.course
      courseData.value = props.course
      break
    case '增加课程':
      // 新建
      disabled.value = false
      courseData.value = props.create
      break
    case '课程修改':
      // 修改
      disabled.value = false
      courseData.value = props.modify
      break
  }
})

const emit = defineEmits(['closeDetail', 'confirm'])

function close() {
  emit('closeDetail')
  if (courseFrom.value) courseFrom.value.clearValidate()
}

const rules = reactive({
  name: [{ required: true, trigger: 'blur' }],
  credit: [{ required: true, trigger: 'blur' }],
  creditHours: [{ required: true, trigger: 'blur' }],
  introduce: [{ required: true, trigger: 'blur' }],
  place: [{ required: true, trigger: 'blur' }],
  time: [{ required: true, trigger: 'blur' }],
  stuNum: [{ required: true, trigger: 'blur' }]
})

const courseFrom = ref<FormInstance>()
function confirm(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (props.title === '课程修改') {
        emit('confirm', 'modify')
      } else {
        emit('confirm', 'create')
      }
    } else {
      return false
    }
  })
}
</script>

<template>
  <el-dialog
    class="course_dialog"
    :close-on-click-modal="disabled"
    :close-on-press-escape="disabled"
    v-model="isShow"
    @close="close"
    :title="props.title"
    width="500px"
    align-center
  >
    <el-form
      ref="courseFrom"
      :disabled="disabled"
      label-width="100px"
      :model="courseData"
      :rules="rules"
    >
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="courseData!.name" placeholder="请输入课程名称" />
      </el-form-item>
      <el-form-item label="任教教师" v-if="disabled">
        <el-input v-model="(courseData as courseInter).teacherName" />
      </el-form-item>
      <el-form-item label="学分" prop="credit">
        <el-input
          v-model.number="courseData!.credit"
          placeholder="请输入课程学分"
        />
      </el-form-item>
      <el-form-item label="学时(h)" prop="creditHours">
        <el-input
          v-model.number="courseData!.creditHours"
          placeholder="请输入课程学生（单位小时）"
        />
      </el-form-item>
      <el-form-item label="教学地点" prop="place">
        <el-input v-model="courseData!.place" placeholder="请输入教学地点" />
      </el-form-item>
      <el-form-item label="教学时间" prop="time">
        <el-input
          v-model="courseData!.time"
          placeholder="请输入教学时间（例：周五6，7节）"
        />
      </el-form-item>
      <el-form-item label="学生数量" prop="stuNum">
        <el-input
          v-model.number="courseData!.stuNum"
          placeholder="请输入学生数量"
        />
      </el-form-item>
      <el-form-item label="课程介绍" prop="introduce">
        <el-input
          placeholder="请输入课程介绍"
          type="textarea"
          resize="none"
          maxlength="100"
          :autosize="{ minRows: 2, maxRows: 10 }"
          :show-word-limit="true"
          v-model="courseData!.introduce"
        />
      </el-form-item>
    </el-form>
    <template #footer v-if="!disabled">
      <span class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="confirm(courseFrom)">
          确定{{ props.modify ? '修改' : '新增' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less">
.course_dialog {
  .el-input.is-disabled,
  .el-textarea.is-disabled .el-textarea__inner,
  .el-input.is-disabled .el-input__inner {
    cursor: text;
  }
}
</style>
