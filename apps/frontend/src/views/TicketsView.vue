<template>
  <v-container fluid
               class="pa-10">
    <v-row dense
           class="justify-center text-center">
      <v-col>
        <v-card :title="tickets.length"
                subtitle="amout of waiting tickets"
                color="secondary"
                variant="outlined"
                tile />
      </v-col>
      <v-col>
        <v-card title="$duration"
                subtitle="avarage wait time"
                color="secondary"
                variant="outlined"
                tile />
      </v-col>
      <v-col>
        <v-card title="$int"
                subtitle="total prints"
                color="secondary"
                variant="outlined"
                tile />
      </v-col>
    </v-row>
    <v-row class="text-center"
           dense>
      <v-col>
        <v-card title="New!"
                subtitle="Creates a new ticket and puts it in the queue."
                color="primary"
                @click="createTicket()"
                ripple
                variant="outlined"
                flat>

          <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive"
                               color="deep-purple"
                               height="4"
                               indeterminate></v-progress-linear>
          </template>
          <v-card-text>
            <v-icon icon="mdi-account-heart-outline"
                    size="2.5rem" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card title="Next!"
                subtitle="Creates a new ticket and puts it in the queue."
                color="primary"
                @click="undefined"
                ripple
                variant="outlined"
                flat>

          <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive"
                               color="deep-purple"
                               height="4"
                               indeterminate></v-progress-linear>
          </template>
          <v-card-text>
            <v-icon icon="mdi-play"
                    size="2.5rem" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="ticket, index in tickets"
             :key="ticket.id"
             :cols="tickets.length <= 12 ? 0 : 1"
             class="text-center">
        <v-card :title="ticket.number"
                :color="(index % 2) ? 'primary' : 'secondary'"
                variant="outlined"
                flat>
          <!-- <v-card-actions class="justify-center">
            <v-btn icon="mdi-trash-can-outline">
            </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">

import { useQueueStore } from '@/stores/queues'
import { useTicketStore } from '@/stores/tickets'
import type { Queue, Ticket } from '@repo/shared-types'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const queuePrefix = route.params.queueName

const ticketStore = useTicketStore()
const tickets = computed(() => ticketStore.tickets.filter((ticket: Ticket) => ticket.queue?.prefix == queuePrefix))

const queueStore = useQueueStore()
const queues = computed(() => queueStore.queues)

async function createTicket() {
  console.log(queues.value)
  console.log(tickets.value)
  const queue = await ticketStore.createTicket(queues.value.find((q: Queue) => q.prefix == queuePrefix).id)
  console.log({ queue })
  return queue
}

onMounted(async () => {
  await queueStore.fetchQueues()
  await ticketStore.fetchTickets()
  console.log(tickets.value)
})
</script>