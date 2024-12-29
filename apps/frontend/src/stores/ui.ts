import { defineStore } from "pinia"
import type { UiStore } from "."
import { ref } from "vue"

export const useUiStore = defineStore('ui', (): UiStore => {
  const title = ref('')
  return { title }
})
