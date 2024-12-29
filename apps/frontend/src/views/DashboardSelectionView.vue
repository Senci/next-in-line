<template>
  <v-container fluid
               class="pa-10">
    <v-row dense>
      <v-card class="mx-auto"
              max-width="300">
        <v-list :items="listItems" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useQueueStore } from '@/stores/queues'
import type { Queue } from '@repo/shared-types'
import { computed, onMounted } from 'vue'

const queueStore = useQueueStore()
const queues = computed(() => queueStore.queues)

const listItems = computed(() => queues.value.map((queue: Queue) => ({
  title: `${queue.name}`,
  props: {
    subtitle: `${queue.prefix}`,
    density: 'compact',
    to: `/dashboard/${queue.prefix}`
  }
})))

onMounted(() => {
  if (!queues.value.length) {
    queueStore.fetchQueues()
  }
})
</script>