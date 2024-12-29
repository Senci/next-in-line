import type { Queue } from '@repo/shared-types'
// import { strapiSDK } from '@strapi/sdk-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { QueueStore } from '.'
import { strapi } from '@/services/strapi'

// const VITE_API_URL = import.meta.env.VITE_BACKEND_URL
// const baseURL = `${VITE_API_URL}`

// const sdk = strapiSDK({ baseURL })
// const queueCollection = sdk.collection('queues')

export const useQueueStore = defineStore('queue', (): QueueStore => {
  const queues = ref<Queue[]>([])

  async function fetchQueues() {
    try {
      queues.value = (await strapi.find<Queue[]>('queues')).data
    } catch (err) {
      console.error(err)
    }
  }

  return { queues, fetchQueues }
})
