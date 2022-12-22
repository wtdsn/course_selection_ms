import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    auth: '',
    name: 'Jack',
    number: '3120004787',
    userId: '',
    otherInfo: {}
  }),
  actions: {
    setInfo(data: any) {
      const { name, number, userId, ...otherInfo } = data
      this.name = name
      this.number = number
      this.userId = userId
      this.otherInfo = otherInfo
    },
    clearInof() {
      this.auth = ''
      this.name = ''
      this.number = ''
      this.userId = 'userId'
      if (this.otherInfo) this.otherInfo = {}
    },
    async getInfo() {
      this.auth = '123'
      return {
        auth: this.auth
      }
    }
  }
})
