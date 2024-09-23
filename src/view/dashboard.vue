<template>
  <div class="main-page">
    <sidebarBs :is-open="isOpen" :toggle="toggleSidebar" :close="closeSidebar" />
    <div class="pagina">
      <navBar class="pt-2" :open="isOpen" :toggle="toggleSidebar" />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import sidebarBs from '@com/sidebar-bs.vue'
import navBar from '@com/nav.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { router } from '../router'
import { apiClient } from '../tools/axios'

const sibar = ref({
  abrir: true,
  opacity: false
})

const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const closeSidebar = () => {
  isOpen.value = false
}
</script>

<style lang="scss" scoped>
.main-page {
  display: grid !important;
  width: 100%;
  grid-template-columns:
    min-content
    auto;
  column-gap: 2vw;

  .pagina {
    display: grid;
    grid-template-rows: min-content auto;
    row-gap: 2vh;
  }
}
</style>
