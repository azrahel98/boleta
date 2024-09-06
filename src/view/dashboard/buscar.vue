<template>
  <div class="w-full bg-gradient-to-br">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center w-[40vw]">
        <div class="flex items-center rounded-full bg-white border-gray-300 shadow-sm">
          <p class="pl-3 pr-2 text-xl">
            <search-icon class="icon icon-sm" />
          </p>

          <input
            type="text"
            v-model="busqueda"
            @keyup.enter="realizarBusqueda"
            placeholder="Search..."
            autocomplete="off"
            class="input !border-0 focus:ring-0 text-center"
          />
        </div>
      </div>

      <h2 class="text-sm font-dm font-semibold mb-4 justify-self-start">
        Trabajadores Encontrados
      </h2>

      <div class="resultados">
        <div
          v-if="trabajadores.length > 0"
          v-for="trabajador in trabajadores"
          class="card rounded-lg shadow-md h-min overflow-hidden"
        >
          <div class="relative">
            <img
              v-if="trabajador.sexo"
              src="../../assets/man.svg"
              class="w-full h-48 object-fill"
            />
            <img v-else src="../../assets/mujer.svg" class="w-full h-48 object-fill" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold font-dm text-md mb-1">{{ trabajador.nombre }}</h3>
            <p class="text-xs text-gray-500 mb-2">{{ trabajador.puesto }}</p>
            <div class="flex justify-between items-center">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  trabajador.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]"
              >
                {{ trabajador.activo ? 'Activo' : 'Inactivo' }}
              </span>

              <router-link :to="{ name: 'perfil', params: { dni: trabajador.dni.toString() } }">
                <button
                  class="px-4 py-1 text-xs rounded-full font-dm font-bold text-blueSecondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightPrimary"
                >
                  Ver Perfil
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { SearchIcon } from 'lucide-vue-next'
import { apiClient } from '../../tools/axios'

interface Itrabajador {
  nombre: String
  puesto: String
  cargos: Number
  dni: String
  activo: Boolean
  sexo: Boolean
}

const trabajadores = ref<Array<Itrabajador>>([])

const busqueda = ref('')

const realizarBusqueda = async () => {
  try {
    trabajadores.value = []
    if (busqueda.value.length > 3) {
      const resultado = (await apiClient.post('/personal/buscar', {
        nombre: busqueda.value
      })) as any
      console.log(resultado)
      resultado.data.forEach((e: any) => {
        trabajadores.value.push({
          activo: e.activo == 'Y' ? true : false,
          nombre: e.nombres,
          puesto: e.cargo,
          cargos: e.cargos,
          dni: e.dni,
          sexo: e.sexo == 'M' ? true : false
        })
      })
    }
  } catch (error) {
    trabajadores.value = []
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
main {
  display: grid;
  height: 100%;
  justify-content: start;
  align-items: start;
  justify-items: center;
  grid-row: 10vh 1vh 80vh;
  grid-template-columns: 1fr;
  .resultados {
    height: 80vh;
    width: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30vh, 30vh));
    column-gap: 2vh;
    row-gap: 3vh;
    justify-content: center;
    overflow-y: auto;
  }
}
</style>
