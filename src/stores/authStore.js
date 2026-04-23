import { defineStore, acceptHMRUpdate } from 'pinia'
import { app_config } from '../../config'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: '',
    config: app_config,
  }),
  getters: {},
  actions: {
    updateToken(value) {
      this.token = value
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
