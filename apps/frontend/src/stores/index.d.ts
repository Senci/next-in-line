import type { Ticket } from '@repo/shared-types'

export interface TicketStore {
  tickets: Ref<Ticket[]>
  logout: () => void
  createTicket: (queueId: string) => Promise<Ticket>
  fetchTickets: () => Promise<void>
  startPolling: () => void
  stopPolling: () => void
  nextInLine: () => void
}

export interface QueueStore {
  queues: Ref<Queue[]>
  fetchQueues: () => Promise<void>
}

export interface UiStore {
  title: Ref<string>
}

export interface AuthStore {
  login: (identifier: string, password: string) => Promise<void>
  logout: () => Promise<void>
}
