<template>
  <div :class="open ? 'translate-x-0 left-9 sidebaropen' : '-translate-x-96 '"
    class="sm:none min-w-[230px] duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0">
    <span className="absolute top-4 right-4 block cursor-pointer xl:hidden font-medium text-gray-600">
      <x-icon @click="close()"></x-icon>
    </span>
    <div class="mt-[50px] flex items-center justify-center">
      <!-- <div
        className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase w-full text-navy-700 dark:text-white"
      > -->
      <img src="../assets/logo.png" width="40" />
      <!-- </div> -->
    </div>
    <div className="mt-[10px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
    <ul className="mb-auto pt-1 font-sans text-md">
      <router-link :to="{ name: 'dashboard' }">
        <div class="relative mb-3 flex hover:cursor-pointer">
          <!-- flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg -->
          <li class="flex w-full cursor-pointer px-4 py-1 text-gray-600 hover:bg-gray-100 mx-3 rounded-lg">
            <span class="text-gray-600">
              <layout-dashboard-icon size="18" />
            </span>
            <p class="leading-1 flex ms-4 font-medium text-gray-600">Inicio</p>
          </li>
          <div class="path"></div>
        </div>
      </router-link>
      <router-link :to="{ name: 'convocatorias' }">
        <div class="relative mb-3 flex hover:cursor-pointer">
          <!-- flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg -->
          <li class="flex w-full cursor-pointer px-4 py-1 text-gray-600 hover:bg-gray-100 mx-3 rounded-lg">
            <span class="text-gray-600">
              <search-icon size="18" />
            </span>
            <p class="leading-1 flex ms-4 font-medium text-gray-600">Convocatoria</p>
          </li>
          <div class="path"></div>
        </div>
      </router-link>
      <router-link :to="{ name: 'buscar' }">
        <div class="relative mb-3 flex hover:cursor-pointer">
          <!-- flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg -->
          <li class="flex w-full cursor-pointer px-4 py-1 text-gray-600 hover:bg-gray-100 mx-3 rounded-lg">
            <span class="text-gray-600">
              <search-icon size="18" />
            </span>
            <p class="leading-1 flex ms-4 font-medium text-gray-600">Buscar</p>
          </li>
          <div class="path"></div>
        </div>
      </router-link>
    </ul>

    <div class="p-4 border-t">
      <button class="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
        <Settings class="h-5 w-5 mr-3" />
        Settings
      </button>
      <button
        class="flex items-center w-full px-4 py-2 mt-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg">
        <LogOut class="h-5 w-5 mr-3" />
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  open: { type: Boolean, default: false },
  close: { type: Function, required: true }
})
import { Settings, LogOut } from 'lucide-vue-next'
import { router } from '../router'

console.log(router.currentRoute)
</script>

<style lang="scss">
.sidebaropen {
  border-radius: 15px;
  margin-top: 1.5vh;
}
</style>
