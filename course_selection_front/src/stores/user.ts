import { defineStore } from 'pinia'
import { getUserInfoApi } from '@/api/user'
import type { userInfoInter } from '@/api/user'

export const useUser = defineStore('user', {
  state: () => ({
    auth: '',
    name: '',
    number: '',
    userId: 0,
    otherInfo: {}
  }),
  actions: {
    setInfo(data: userInfoInter) {
      const { name, number, auth, userId, ...otherInfo } = data
      this.auth = auth
      this.name = name
      this.number = number
      this.userId = userId
      this.otherInfo = otherInfo
    },
    clearInof() {
      this.auth = ''
      this.name = ''
      this.number = ''
      this.userId = 0
      if (this.otherInfo) this.otherInfo = {}
    },
    async getInfo() {
      const { code, data } = await getUserInfoApi()
      if (code) {
        this.setInfo(data!)
        return data!.auth
      }
    }
  }
})
