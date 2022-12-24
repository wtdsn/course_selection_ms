<script setup lang="ts">
import type { courseInter } from '@/api/course'
interface propsInter {
  isShow: boolean
  title: string
  course?: courseInter
  modify?: boolean
  create?: boolean
}
const props = defineProps<propsInter>()
const isShow = ref(false)
const courseData = ref<courseInter>()
watchEffect(() => {
  isShow.value = props.isShow
  // 新建
  /*   if(props.create){ } */

  // 修改
  /* 
    if(props.modify){}
  */

  // 查看详情
  courseData.value = props.course
})

const emit = defineEmits(['closeDetail'])

function close() {
  emit('closeDetail')
}
</script>

<template>
  <el-dialog
    v-model="isShow"
    @close="close"
    :title="props.title"
    width="300px"
    align-center
  >
    <el-form label-width="100px" :model="courseData">
      <el-form-item label="课程名称">
        <el-input v-model="courseData!.name" />
      </el-form-item>
      <el-form-item label="任教教师" v-if="!!props.course">
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
        <el-input v-model="courseData!.introduce" />
      </el-form-item>
    </el-form>
    <!--     <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<style scoped lang="less"></style>
