<template>
  <div
    :class="open ? 'translate-x-0 left-9 sidebaropen' : '-translate-x-96 '"
    class="sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0"
  >
    <span
      className="absolute top-4 right-4 block cursor-pointer xl:hidden font-medium text-gray-600"
    >
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
    <ul className="mb-auto pt-1">
      <router-link :to="{ name: 'dashboard' }">
        <div class="relative mb-3 flex hover:cursor-pointer">
          <li class="my-[3px] flex cursor-pointer items-center px-8">
            <span class="font-medium text-gray-600">
              <layout-dashboard-icon />
            </span>

            <p class="leading-1 flex ms-4 font-medium text-gray-600">Dashboard</p>
          </li>
          <div class="path"></div>
        </div>
      </router-link>
      <router-link :to="{ name: 'convocatorias' }">
        <div class="relative mb-3 flex hover:cursor-pointer">
          <li class="my-[3px] flex cursor-pointer items-center px-8">
            <span class="font-medium text-gray-600">
              <list-numbers-icon />
            </span>
            <p class="leading-1 flex ms-4 font-medium text-gray-600">Convocatorias</p>
          </li>
          <div class="path"></div>
        </div>
      </router-link>
      <router-link :to="{ name: 'buscar' }">
        <div class="relative mb-3 flex hover:cursor-pointer">
          <li class="my-[3px] flex cursor-pointer items-center px-8">
            <span class="font-medium text-gray-600">
              <search-icon />
            </span>
            <p class="leading-1 flex ms-4 font-medium text-gray-600">Buscar</p>
          </li>
          <div class="path"></div>
        </div>
      </router-link>
    </ul>

    <div class="flex justify-center"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  open: { type: Boolean, default: false },
  close: { type: Function, required: true }
})
</script>

<style lang="scss">
.sidebaropen {
  border-radius: 15px;
  margin-top: 1.5vh;
}
</style>
