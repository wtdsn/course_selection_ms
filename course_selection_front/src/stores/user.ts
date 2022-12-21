import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    auth: '',
    name: 'Jack',
    number: '3120004787',
    userId: '',
    otherInfo: {
      gender: '男',
      majorClass: '软件工程一班',
      school: '计算机学院',
      session: '20届'
    }
  }),
  actions: {
    setInfo() {},
    clearInof() {
      this.auth = ''
    },
    async getInfo() {
      this.auth = localStorage.getItem('isLogin')
      return {
        auth: this.auth
      }
    }
  }
})
