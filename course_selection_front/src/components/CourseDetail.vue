<script setup lang="ts">
import type { courseInter } from '@/api/course'
interface propsInter {
  isShow: boolean
  title: string
  course?: courseInter
  modify?: courseInter
  create?: courseInter
}
const props = defineProps<propsInter>()
const isShow = ref(false)
const disabled = ref(true) // 如果是详情，为 true
const courseData = ref<courseInter>()
watchEffect(() => {
  isShow.value = props.isShow

  if (props.create) {
    // 新建
    disabled.value = false
    courseData.value = props.create
  } else if (props.modify) {
    // 修改
    disabled.value = false
    courseData.value = props.modify
  } else {
    // 查看详情
    disabled.value = !!props.course
    courseData.value = props.course
  }
})

const emit = defineEmits(['closeDetail', 'confirm'])

function close() {
  emit('closeDetail')
}

function confirm() {
  if (props.modify) {
    emit('confirm', 'modify')
  } else {
    emit('confirm', 'create')
  }
}
</script>

<template>
  <el-dialog
    v-model="isShow"
    @close="close"
    :title="props.title"
    width="500px"
    align-center
  >
    <el-form :disabled="disabled" label-width="100px" :model="courseData">
      <el-form-item label="课程名称">
        <el-input v-model="courseData!.name" />
      </el-form-item>
      <el-form-item label="任教教师" v-if="disabled">
        <el-input v-model="courseData!.teacherName" />
      </el-form-item>
      <el-form-item label="学分">
        <el-input v-model="courseData!.credit" />
      </el-form-item>
      <el-form-item label="学时">
        <el-input v-model="courseData!.creditHours" />
      </el-form-item>
      <el-form-item label="学时">
        <el-input v-model="courseData!.creditHours" />
      </el-form-item>
      <el-form-item label="教学地点">
        <el-input v-model="courseData!.place" />
      </el-form-item>
      <el-form-item label="教学时间">
        <el-input v-model="courseData!.time" />
      </el-form-item>
      <el-form-item label="学生数量">
        <el-input v-model="courseData!.stuNum" />
      </el-form-item>
      <el-form-item label="课程介绍">
        <el-input
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
        <el-button type="primary" @click="confirm">
          确定{{ props.modify ? '修改' : '新增' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
