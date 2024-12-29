import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Ticket } from '@repo/shared-types'
import type { TicketStore } from '.'
import { strapi } from '@/services/strapi'

export const useTicketStore = defineStore('ticket', (): TicketStore => {
  const tickets = ref<Ticket[]>([])
  const pollingInterval = 5000
  const isPollingActive = ref(false)
  const pollingIntervalId = ref<ReturnType<typeof setTimeout> | null>(null)

  async function createTicket(queueId: string) {
    try {
      const identifier = 'xxxx'
      const password = 'xxxx'

      try {
        const loginResponse = await strapi.login({
          identifier,
          password
        })
        console.log('loginResponse')
        console.log(loginResponse)
      } catch (err) {
        console.log('loginError')
        console.error(err)
      }
      const createdTicket = (await strapi.create<Ticket>('ticket', { queue: queueId })).data
      console.log('Ticket created successfully:', createdTicket)
      return createdTicket
    } catch (error) {
      console.error('Error creating ticket:', error)
      throw error
    }
  }

  async function fetchTickets() {
    console.log('Fetching tickets...')
    tickets.value = (await strapi.find<Ticket[]>('tickets')).data
  }

  function startPolling() {
    if (!isPollingActive.value) {
      isPollingActive.value = true
      pollingIntervalId.value = setInterval(fetchTickets, pollingInterval)
      console.log('Polling started with interval: ', pollingIntervalId.value)
    } else {
      console.warn('Polling already active with interval: ', pollingIntervalId.value)
    }
  }

  function stopPolling() {
    if (pollingIntervalId.value !== null) {
      const intervalId = pollingIntervalId.value
      console.log(pollingIntervalId.value)
      clearInterval(pollingIntervalId.value)
      console.log(pollingIntervalId.value)
      console.log('Polling stopped with interval: ', intervalId)
      isPollingActive.value = false
      pollingIntervalId.value = null
    }
  }

  return { tickets, createTicket, fetchTickets, startPolling, stopPolling }
})
