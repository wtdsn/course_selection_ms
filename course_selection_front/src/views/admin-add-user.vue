<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

import { addStuApi, addTeaApi } from '@/api/user'
import type { stuInfoInter, teaInfoInter } from '@/api/user'

function multiAdd() {
  ElMessage.info('开发中')
}

const type = ref('student')

const stuFrom = ref<FormInstance>()
const teaFrom = ref<FormInstance>()

const stuFormData = reactive<stuInfoInter>({
  name: '',
  number: '',
  gender: '',
  majorClass: '',
  school: '',
  session: ''
})

const teaFormData = reactive<teaInfoInter>({
  name: '',
  number: '',
  gender: ''
})

const rules = reactive({
  name: [{ required: true, trigger: 'blur' }],
  number: [{ required: true, trigger: 'blur' }],
  gender: [{ required: true, trigger: 'blur' }],
  majorClass: [{ required: true, trigger: 'blur' }],
  school: [{ required: true, trigger: 'blur' }],
  session: [{ required: true, trigger: 'blur' }]
})

const submitForm = (
  type: 'student' | 'teacher',
  formEl: FormInstance | undefined
) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await addUser(type)
      if (res) formEl.resetFields()
    } else {
      return false
    }
  })
}

async function addUser(type: 'student' | 'teacher') {
  let result
  if (type === 'student') {
    result = await addStuApi(stuFormData)
  } else {
    result = await addTeaApi(teaFormData)
  }
  if (result.code === 1) {
    ElMessage.success('增加成功')
    return true
  }
  return false
}
</script>

<template>
  <div class="add_user_con">
    <header class="header">
      <!-- 身份类型 -->
      <el-select v-model="type" placeholder="请选择添加类型">
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
      <el-button type="primary" @click="multiAdd">批量添加</el-button>
    </header>
    <div class="add_form">
      <template v-if="type === 'student'">
        <el-form
          ref="stuFrom"
          :model="stuFormData"
          status-icon
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="stuFormData.name"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="学号" prop="number">
            <el-input
              v-model="stuFormData.number"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="stuFormData.gender" placeholder="请选择性别">
              <el-option
                v-for="item in [
                  { type: '男', lable: '男' },
                  { type: '女', lable: '女' }
                ]"
                :key="item.type"
                :label="item.lable"
                :value="item.type"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="专业班级" prop="majorClass">
            <el-input
              v-model="stuFormData.majorClass"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="学院" prop="school">
            <el-input
              v-model="stuFormData.school"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="入学届期" prop="session">
            <el-input
              v-model="stuFormData.session"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100px"
              @click="submitForm('student', stuFrom)"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <el-form
          ref="teaFrom"
          :model="teaFormData"
          status-icon
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="teaFormData.name"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="工号" prop="number">
            <el-input
              v-model="teaFormData.number"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="teaFormData.gender" placeholder="请选择性别">
              <el-option
                v-for="item in [
                  { type: '男', lable: '男' },
                  { type: '女', lable: '女' }
                ]"
                :key="item.type"
                :label="item.lable"
                :value="item.type"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100px"
              @click="submitForm('teacher', teaFrom)"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.add_user_con {
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;

  .header {
    display: flex;
    justify-content: space-between;
  }

  .add_form {
    margin: 0 auto;
    margin-top: 40px;
    width: 400px;
  }
}
</style>
