<template>
  <div class="contenedor">
    <div class="grid">
      <div class="bg-white perfil rounded-lg shadow overflow-hidden">
        <div class="h-24 bg-gradient-to-r from-purple-600 to-indigo-900"></div>
        <div class="relative px-4 pb-4">
          <img src="../../assets/man.svg"
            class="h-28 w-28 avatar rounded-full object-contain border-4 bg-white border-lightPrimary shadow-md absolute left-[42%] -mt-12" />

          <div class="pt-16 font-dm">
            <h2 class="text-xl font-bold text-gray-800">{{ perfil.nombres }}</h2>
            <p class="text-gray-600">{{ perfil.dni }}</p>
            <div class="flex justify-between mt-4">

            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Personal</h3>
        <ul class="font-sans text-sm flex flex-col justify-start gap-3 pb-6 h-full">
          <li v-if="perfil.direccion" class="flex gap-3">
            <current-location-icon /> {{ perfil.direccion }}
          </li>
          <li v-if="perfil.correo" class="flex gap-3"><mail-icon />{{ perfil.correo }}</li>
          <li v-if="perfil.telefono" class="flex gap-3">
            <device-mobile-icon />{{ perfil.telefono }}
          </li>
          <li class="flex gap-3"><balloon-icon />{{ perfil.nacimiento }}</li>
          <li v-if="perfil.ruc" class="flex gap-3"><id-icon />{{ perfil.ruc }}</li>
          <li v-if="perfil.pension" class="flex gap-3">
            <building-bank-icon />{{ perfil.pension }}
          </li>
        </ul>
      </div>

      <div class="bg-white rounded-lg shadow p-6 col-span-full">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">All projects</h3>
        <p class="text-gray-600 mb-4">
          Here you can find more details about your projects. Keep you user engaged by providing
          meaningful information.
        </p>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { apiClient } from '../../tools/axios'
import { router } from '../../router'
import { RouteLocationNormalizedLoadedGeneric } from 'vue-router'

const perfil = ref<any>({})

onMounted(async () => {
  const res = await apiClient.post('/personal/dni', {
    dni: parseInt(router.currentRoute.value.params.dni.toString())
  })

  perfil.value = res.data
})

watch(router.currentRoute, async (x: RouteLocationNormalizedLoadedGeneric, _y) => {
  const res = await apiClient.post('/personal/dni', {
    dni: parseInt(x.params.dni.toString())
  })

  perfil.value = res.data
})

</script>

<style lang="scss" scoped>
.contenedor {
  width: 100%;

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20vh, 50vh));
    column-gap: 2vh;
    padding: 0 2vh 0 2vh;
    row-gap: 2vh;
    justify-content: space-evenly;
    grid-template-rows: 1fr;
    width: 100%;


  }
}
</style>
