<template>
  <div class="contenedor">
    <div class="grid">
      <div class="inicio">
        <div class="bg-white perfil rounded-lg shadow overflow-hidden">
          <div class="h-40 bg-gradient-to-r from-purple-600 to-indigo-900"></div>
          <div class="relative pb-4">
            <img
              v-if="perfil.imagen"
              :src="`data:image/png;base64,${perfil.imagen}`"
              class="h-36 w-36 avatar rounded-full shadow-md border-lightPrimary border-2"
            />
            <img
              v-else
              src="../../assets/logo.png"
              class="h-36 w-36 avatar rounded-full shadow-md border-lightPrimary border-2"
            />

            <div class="pt-14 font-dm flex flex-col text-center">
              <h2 class="text-lg font-bold text-gray-800">{{ perfil.nombres }}</h2>
              <p class="text-gray-600">{{ perfil.dni }}</p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="flex w-full justify-between">
            <h3 class="text-lg font-semibold text-gray-800 mb-2 mt-3">Personal</h3>
            <div class="flex items-center justify-center">
              <edit-icon class="button" onclick="my_modal_5.showModal()" size="35" />
            </div>
          </div>
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
      </div>

      <modal :perfil="perfil" />

      <div class="card rounded-md col-span-full"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { apiClient } from '../../tools/axios'
import { router } from '../../router'
import modal from '../../components/perfil/modal.vue'
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
  padding-left: 1vw;
  padding-right: 1vw;
  .grid {
    padding-left: 5vw;
    padding-right: 5vw;
    .inicio {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      column-gap: 2vw;
      row-gap: 1vh;
      width: 100%;

      .perfil {
        img {
          align-items: center;
          justify-content: center;
          text-align: center;
          left: 39%;
          position: absolute;
          padding: 0;
          top: -80%;
        }
      }
      .card {
        justify-self: end;
      }
    }
  }
}
</style>
