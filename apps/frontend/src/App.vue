<template>
  <v-app id="next-in-line">
    <v-navigation-drawer v-model="drawer"
                         temporary>
      <v-list>
        <v-list-item prepend-icon="mdi-cat"
                     title="Home"
                     value="home"
                     to="/" />
        <v-list-item prepend-icon="mdi-owl"
                     title="Dashboard"
                     value="dashboard"
                     to="/dashboard" />
        <v-divider />
      </v-list>
      <v-list v-if="queues">
        <v-list-item>
          <v-list-item-subtitle>Venues</v-list-item-subtitle>
        </v-list-item>
        <v-list-item v-for="queue in queues"
                     :key="queue.prefix"
                     :title="queue.name"
                     :to="`/tickets/${queue.prefix}`" />
      </v-list>

      <template v-slot:append>
        <v-list>
          <v-list-item title="loogin"
                       to="/login"
                       prepend-icon="mdi-login" />
          <v-list-item title="Logout"
                       @click="logout"
                       prepend-icon="mdi-logout" />
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar density="compact"
               flat
               app
               location="bottom">
      <v-app-bar-nav-icon icon="mdi-infinity"
                          @click="drawer = !drawer" />
      <v-toolbar-title class="font-space-mono">
        siebdruck@38c3$<span class="blink">▮</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useQueueStore } from './stores/queues'
import { useAuthStore } from './stores/auth'

const drawer = ref(null)

const queueStore = useQueueStore()
const queues = computed(() => queueStore.queues)


async function logout() {
  await useAuthStore().logout()
}

onMounted(() => {
  queueStore.fetchQueues()
})
</script>

<style>
.blink {
  animation: blinker 1s step-start infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
