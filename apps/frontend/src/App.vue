<template>
  <v-app id="next-in-line">
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list density="compact" nav>
        <v-list-item @click="navigate('/')" prepend-icon="mdi-cat" title="Home" value="home"></v-list-item>
        <v-list-item @click="navigate('/clerk')" prepend-icon="mdi-owl" title="Clerk" value="about"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon icon="mdi-infinity" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Next In Line</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { router } from './plugins/router'

const drawer = ref(null)

function navigate(to: string) {
  router.push({ name: to })
}
</script>
