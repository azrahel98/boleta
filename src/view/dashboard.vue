<template>
  <div class="flex w-full bg-lightPrimary">
    <sidebar :open="sibar.abrir" :close="close" />
    <div
      class="h-full w-full dark:!bg-navy-900"
      :class="sibar.opacity === true ? 'blur-sm pointer-events-none abierto' : ''"
    >
      <main class="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[250px]">
        <div class="h-full view">
          <nav
            class="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d] bg-red-50"
          >
            <div class="ml-[6px]">
              <div class="h-6 w-[224px] pt-1">
                <a
                  className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                >
                  Pages
                </a>
              </div>
            </div>
            <!-- Aqui -->

            <div class="flex justify-items-center align-content-center items-center gap-3">
              <div
                v-if="router.currentRoute.value.name != 'buscar'"
                class="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-between px-3 rounded-full bg-white px-0 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[320px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2"
              >
                <div
                  class="flex h-full items-center w-full rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]"
                >
                  <p class="pl-3 pr-2 text-xl">
                    <search-icon class="icon icon-sm" />
                  </p>
                  <div class="dropdown dropdown-end">
                    <input
                      type="text"
                      @keyup="buscar"
                      v-model="search"
                      placeholder="Search..."
                      class="block h-full text-center w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
                    />
                    <div tabindex="1" class="dropdown-content personas shadow-lg bg-white shadow">
                      <div
                        v-for="x in personas"
                        class="flex hover:bg-lightPrimary"
                        @click="ruta(x.dni)"
                      >
                        <img v-if="x.sexo == 'M'" src="../assets/mann.svg" class="imagen" />
                        <img v-else src="../assets/mujer.svg" class="imagen" />
                        <h1>{{ x.nombres }}</h1>
                      </div>
                    </div>
                  </div>
                </div>

                <span
                  className="flex cursor-pointer mr-1 text-xl text-gray-600 dark:text-white xl:hidden"
                >
                  <menu-icon
                    class="h-5 w-5"
                    v-if="!sibar.abrir"
                    @click="() => ((sibar.abrir = true), (sibar.opacity = true))"
                  />
                  <x-icon class="h-5 w-5" v-else @click="close" />
                </span>
              </div>
              <div class="relative flex dropdown dropdown-end">
                <div class="flex">
                  <img
                    tabindex="0"
                    role="button"
                    class="h-10 w-10 rounded-full object-contain"
                    src="../assets/logo.png"
                    alt="Elon Musk"
                  />
                </div>
                <div
                  tabindex="0"
                  class="dropdown-content py-2 top-8 -left-[180px] w-max absolute z-10 origin-top-right transition-all duration-300 ease-in-out"
                >
                  <div
                    className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none"
                  >
                    <div className="mt-3 ml-4">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          👋 Hey, Adela
                        </p>
                        {" "}
                      </div>
                    </div>
                    <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

                    <div className="mt-3 ml-4 flex flex-col">
                      <a
                        href=" "
                        className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                      >
                        Profile Settings
                      </a>
                      <a
                        href=" "
                        className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                      >
                        Newsletter Settings
                      </a>
                      <a
                        href=" "
                        className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                      >
                        Log Out
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <RouterView class="mx-auto mb-auto"></RouterView>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import sidebar from '../components/sidebar.vue'
// import { invoke } from '@tauri-apps/api'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { router } from '../router'

const sibar = ref({
  abrir: true,
  opacity: false
})
window.addEventListener('resize', () =>
  window.innerWidth < 1200
    ? (sibar.value = { abrir: false, opacity: false })
    : (sibar.value = { abrir: true, opacity: false })
)

const close = () => {
  sibar.value = { abrir: false, opacity: false }
}

const personas = ref<Array<any>>([])

const search = ref('')

const buscar = async () => {
  try {
    if (search.value.length > 3) {
      personas.value = []
      //   const datos = (await invoke('buscar_trabajadores', { nombres: search.value })) as Array<any>
      //   personas.value = datos
    }
  } catch (error) {
    console.log(error)
  }
}

const ruta = (dni: string) => {
  personas.value = []
  search.value = ''

  router.replace({ name: 'trabajador', params: { dni } })
}

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1200) {
    sibar.value.abrir = true
  } else {
    sibar.value.abrir = false
  }
})
</script>

<style lang="scss" scoped>
.view {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 10vh auto;
  row-gap: 1vh;
  align-items: start;
}

.abierto {
  background: rgba(203, 212, 221, 0.5); /* Color de fondo transparente */
  z-index: 1;
}

.personas {
  position: fixed;
  width: 40vw;
  margin-top: 2vh;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.8rem;
  text-align: center;
  max-height: 50vh;
  overflow-y: auto;
  div {
    cursor: pointer;
    padding: 0;
    padding-top: 1vh;
    padding-left: 1vh;
    padding-right: 1vh;

    max-height: 50vh;
    .imagen {
      width: 5vh;
    }
  }
  :hover {
    border-radius: 10px;
  }
}
</style>
