<template>
  <v-container class="fill-height">
    <v-card class="mx-auto v-col-12 px-6 py-8"
            variant="outlined"
            color="secondary">
      <v-form v-model="form"
              @submit.prevent="onSubmit">
        <v-text-field v-model="identifier"
                      :readonly="loading"
                      :rules="[required]"
                      class="mb-2"
                      label="User"
                      placeholder="Enter your user identifier"
                      clearable />

        <v-text-field v-model="password"
                      :readonly="loading"
                      :rules="[required]"
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      clearable />

        <br>

        <v-btn :disabled="!form"
               :loading="loading"
               :color="loading ? 'primary' : 'secondary'"
               size="x-large"
               type="submit"
               variant="outlined"
               block>
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useAuthStore } from "@/stores/auth"
import { type StrapiError } from "strapi-sdk-js"

const authStore = useAuthStore()

const form = ref(false)
const identifier = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function onSubmit() {
  try {
    loading.value = true
    await authStore.login(identifier.value, password.value)
  } catch (error) {
    const err = error as StrapiError
    const isStrapiError = err && err.error && err.error.message
    errorMessage.value = isStrapiError ? err.error.message :
      `Unknown error occured. Look at the console for more information.`
    console.error(error)
  } finally {
    loading.value = false
  }
}

function required(value: string) {
  return !!value || 'Field is required'
}
</script>
