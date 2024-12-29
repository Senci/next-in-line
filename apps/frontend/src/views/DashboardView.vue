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
    <v-row dense
           class="text-center">
      <v-col class="col=12">
        <v-card color="primary"
                variant="outlined"
                tile>
          <v-card-title class="text-h0">
            <h1 v-text="next.number"></h1>
          </v-card-title>
          <v-card-actions class="justify-center">
            <v-chip size="x-large"
                    label>
              NEXT IN LINE #{{ next.number }}
              <v-icon icon="mdi-human-greeting-proximity"
                      end></v-icon>
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense
           class="text-center">
      <v-col v-for="ticket, i in tickets"
             :key="ticket.id">
        <v-card :style="{
          opacity: 1 - i / queueSize
        }"
                :text="tickets[i].number"
                tile />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useQueueStore } from '@/stores/queues'
import { useTicketStore } from '@/stores/tickets'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const queueName = route.params.queueName

const ticketStore = useTicketStore()
const tickets = computed(() => ticketStore.tickets)
async function fetchTickets() {
  ticketStore.fetchTickets()
}

const queueStore = useQueueStore()
const queues = computed(() => queueStore.queues)
async function fetchQueues() {
  queueStore.fetchQueues()
}

const next = computed(() => tickets.value[0] || { number: 0 })
const queueSize = computed(() => tickets.value.length)

onMounted(async () => {
  await Promise.all([fetchTickets(), fetchQueues()])
  ticketStore.startPolling()
})

onUnmounted(() => {
  ticketStore.stopPolling()
})

</script>