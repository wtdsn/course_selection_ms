<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUser } from '@/stores/user'
import { useRouter } from 'vue-router'

const loginFormData = reactive({
  number: '',
  pw: ''
})

// 身份切换
const auth = ref('admin')
function toggleAuth(_auth: string) {
  auth.value = _auth
}

// 点击登录
const userStore = useUser()
const loading = ref(false)
const router = useRouter()
async function login() {
  loading.value = true
  const res: any = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        auth: loginFormData.number
      })
    }, 1000)
  })
  userStore.auth = res.auth as string
  localStorage.setItem('isLogin', res.auth)
  router.push({
    path: '/'
  })
  loading.value = false
}
</script>

<template>
  <div class="login_container">
    <div class="login_box">
      <div class="title">学生选课管理系统</div>
      <div class="login_form">
        <el-form ref="loginForm" :model="loginFormData">
          <el-form-item label="" prop="number">
            <el-input
              class="form_input"
              v-model.number="loginFormData.number"
              type="text"
              placeholder="请输入账号"
              autocomplete="off"
            >
              <template #prefix>
                <i-ep-UserFilled />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="pw">
            <el-input
              class="form_input"
              v-model="loginFormData.pw"
              type="password"
              placeholder="请输入密码"
              autocomplete="off"
            >
              <template #prefix>
                <i-mdi-password />
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="login_button"
              :loading="loading"
              @click="login"
            >
              登<span class="span"></span>录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="line">点击按钮选择你的身份</div>
      <ul class="toggle_auth">
        <li
          @click="toggleAuth('student')"
          :class="{ active: auth === 'student' }"
        >
          学生
        </li>
        <li
          @click="toggleAuth('teacher')"
          :class="{ active: auth === 'teacher' }"
        >
          教师
        </li>
        <li @click="toggleAuth('admin')" :class="{ active: auth === 'admin' }">
          管理员
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.login_container {
  width: 100vw;
  height: 100vh;

  background-color: rgb(124, 213, 243);

  .allCenter();

  .login_box {
    min-width: 260px;
    padding: 20px;

    border-radius: 10px;
    background-color: #fff;

    .title {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      padding-bottom: 30px;
      letter-spacing: 4px;
    }

    .login_form {
      .form_input {
        height: 38px;
      }

      .login_button {
        height: 34px;
        width: 100%;

        .span {
          width: 10px;
        }
      }
    }

    .line {
      position: relative;

      width: fit-content;
      height: 20px;
      padding: 10px 6px 0;

      margin: 0 auto;
      font-size: 13px;

      &::before {
        position: absolute;
        content: '';
        height: 0px;
        width: 50px;

        top: 20px;
        right: 100%;
        border-top: 1px solid rgb(154, 154, 154);
      }

      &::after {
        position: absolute;
        content: '';
        height: 0px;
        width: 50px;

        top: 20px;
        left: 100%;
        border-top: 1px solid rgb(154, 154, 154);
      }
    }

    .toggle_auth {
      padding-top: 12px;
      display: flex;
      justify-content: space-around;

      li {
        border-radius: 4px;

        padding: 4px 8px;
        font-size: 14px;

        color: rgb(138, 170, 240);
        border: 1px solid rgb(162, 186, 238);

        cursor: pointer;

        &:hover {
          box-shadow: 0 0 4px 1px #ccc;
        }
      }

      .active {
        color: rgb(84, 134, 244);
        border: 2px solid rgb(119, 159, 246);
        background-color: rgba(139, 226, 253, 0.498);
      }
    }
  }
}
</style>
