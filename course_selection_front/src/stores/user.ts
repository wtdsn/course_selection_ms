import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    auth: '',
    name: '',
    number: ''
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
