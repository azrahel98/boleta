<template>
  <div
    :class="open ? 'translate-x-0 left-9 sidebaropen' : '-translate-x-96 '"
    class="sm:none min-w-[230px] duration-175 linear fixed pb-10 !z-50 flex min-h-full flex-col bg-white shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0"
  >
    <span
      className="absolute top-4 right-4 block cursor-pointer xl:hidden font-medium text-gray-600"
    >
      <x-icon @click="close()"></x-icon>
    </span>
    <div class="mt-[50px] flex items-center justify-center">
      <img src="../assets/logo.png" width="40" />
    </div>
    <div className="mt-[10px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
    <ul className="mb-auto pt-1 font-dm text-sm">
      <router-link :to="{ name: 'dashboard' }">
        <div class="relative mb-3 flex hover:cursor-pointer">
          <li class="flex w-full cursor-pointer text-gray-600">
            <span class="text-gray-600">
              <layout-dashboard-icon size="18" />
            </span>
            <p class="leading-1 flex ms-4 titulo">Inicio</p>
          </li>
          <div class="path"></div>
        </div>
      </router-link>
      <router-link :to="{ name: 'convocatorias' }">
        <div class="relative mb-3 flex hover:cursor-pointer">
          <li class="flex w-full cursor-pointer text-gray-600">
            <span class="text-gray-600">
              <search-icon size="18" />
            </span>
            <p class="flex ms-4 titulo">Convocatoria</p>
          </li>
          <div class="path"></div>
        </div>
      </router-link>
    </ul>

    <div class="flex justify-around pt-3 max-w-[17vw]">
      <div class="avatar">
        <div class="w-12 rounded-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="Tailwind-CSS-Avatar-component"
          />
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <p class="font-medium text-md font-dm">{{ store.nombre }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  open: { type: Boolean, default: false },
  close: { type: Function, required: true }
})
import { userStore } from '@store/user'

const store = userStore()
</script>

<style lang="scss">
.sidebaropen {
  border-radius: 15px;
  margin-top: 1.5vh;
}

li {
  border-radius: 50px;

  padding: 1.1vh;
}
li:hover {
  border-radius: 0px;
  padding-right: 0;

  background-color: #f4f7fe;
}
</style>
