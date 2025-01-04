import type { Queue } from '@repo/shared-types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { QueueStore } from '.'
import { strapi } from '@/services/strapi'

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
