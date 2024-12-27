import type { Ticket } from '@repo/shared-types';

export interface TicketStore {
  tickets: Ref<Ticket[]>
  createTicket: (queueId: string) => Promise<Ticket>
  fetchTickets: () => Promise<void>
}

export interface QueueStore {
  queues: Ref<Queue[]>
  fetchQueues: () => Promise<void>
}
