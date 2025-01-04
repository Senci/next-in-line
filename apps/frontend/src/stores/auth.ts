import { defineStore } from 'pinia'
import { strapi } from '@/services/strapi'
import type { AuthStore } from '.'

export const useAuthStore = defineStore('auth', (): AuthStore => {

  async function login(identifier: string, password: string) {
    try {
      await strapi.login({
        identifier,
        password
      })
    } catch (err) {
      console.error(err)
    }
  }

  async function logout() {
    try {
      await strapi.logout()
    } catch (err) {
      console.error(err)
    }
  }

  return { login, logout }
})
