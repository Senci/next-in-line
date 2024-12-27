<template>
  <v-container fluid
               class="fill-height pa-10">
    <v-row dense></v-row>
    <v-row dense
           class="align-stretch">
      <v-col class="col=12">
        <v-card class="d-flex flex-grow-1 flex-shrink-0 flex-column justify-center align-center col-12"
                color="primary"
                variant="outlined">
          <v-card-title class="text-h0">
            <h1 v-text="next.number"></h1>
          </v-card-title>
          <v-card-actions>
            <v-chip size="x-large"
                    variant="outlined"
                    label>
              <h3>
                NEXT IN LINE #{{ next.number }}
                <v-icon icon="mdi-human-greeting-proximity"
                        end></v-icon>
              </h3>
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col class="col-12">
        <v-stepper mobile
                   flat>
          <v-stepper-header>
            <template v-for="i in queueSize"
                      :key="i">

              <v-stepper-item></v-stepper-item>
            </template>
          </v-stepper-header>
        </v-stepper></v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useQueueStore } from '@/stores/queues'
import { useTicketStore } from '@/stores/tickets'
import { computed, onMounted } from 'vue'

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

const next = computed(() => tickets.value[0])
const queueSize = computed(() => tickets.value.length)

onMounted(() => {
  fetchTickets()
  fetchQueues()
})

</script>