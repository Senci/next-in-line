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
  login('gaenge', 'gaenge')

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

  async function createTicket(queueId: string) {
    try {
      await login('gaenge', 'gaenge')
      const queue = queueId
      const createdTicket = (await strapi.create<Ticket>('tickets', { queue })).data
      console.log('Ticket created successfully:', createdTicket)
      fetchTickets()
      return createdTicket
    } catch (error) {
      console.error('Error creating ticket:', error)
      throw error
    }
  }

  async function nextInLine() {
    const id = tickets.value[0].documentId as string
    const data = {
      state: 'served'
    }
    await strapi.update<Ticket>('tickets', id, data)
    fetchTickets()
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
      clearInterval(pollingIntervalId.value)
      console.log('Polling stopped with interval: ', intervalId)
      isPollingActive.value = false
      pollingIntervalId.value = null
    }
  }

  return {
    tickets,
    login,
    createTicket,
    nextInLine,
    fetchTickets,
    startPolling,
    stopPolling,
    logout: strapi.logout
  }
})
