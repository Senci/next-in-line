import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Ticket } from '@repo/shared-types'
import { strapiSDK } from '@strapi/sdk-js'
import type { TicketStore } from './types'

const VITE_API_URL = import.meta.env.VITE_BACKEND_URL
const baseURL = `${VITE_API_URL}`

const sdk = strapiSDK({ baseURL })
const ticketCollection = sdk.collection('tickets')

export const useTicketStore = defineStore('ticket', (): TicketStore => {
  const tickets = ref<Ticket[]>([])

  async function createTicket(queueId: string) {
    try {
      const createdTicket = (await ticketCollection.create({ queue: queueId })).data as unknown as Ticket
      console.log('Ticket created successfully:', createdTicket)
      return createdTicket
    } catch (error) {
      console.error('Error creating ticket:', error)
      throw error
    }
  }

  async function fetchTickets() {
    const waitingTickets = (await ticketCollection.find()).data as unknown as Ticket[]

    tickets.value = waitingTickets
  }

  return { tickets, createTicket, fetchTickets }
})
