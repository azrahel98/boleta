<template>
  <div class="max-w-7xl mx-auto p-4 w-full">
    <div class="grid">
      <div class="bg-white perfil rounded-lg shadow overflow-hidden">
        <div class="h-32 bg-gradient-to-r from-purple-600 to-indigo-900"></div>
        <div class="relative px-4 pb-4">
          <img src="../../assets/man.svg"
            class="h-28 w-28 avatar rounded-full object-contain border-4 bg-white border-lightPrimary shadow-md absolute left-[42%] -mt-12" />

          <div class="pt-16 font-dm">
            <h2 class="text-xl font-bold text-gray-800">{{ perfil.nombres }}</h2>
            <p class="text-gray-600">{{ perfil.dni }}</p>
            <div class="flex justify-between mt-4">
              <!-- <div class="text-center">
                <span class="block text-2xl font-bold text-gray-800">{{ employee.posts }}</span>
                <span class="text-md text-gray-600">Posts</span>
              </div>
              <div class="text-center">
                <span class="block text-2xl font-bold text-gray-800">{{ employee.followers }}</span>
                <span class="text-md text-gray-600">Followers</span>
              </div>
              <div class="text-center">
                <span class="block text-2xl font-bold text-gray-800">{{ employee.following }}</span>
                <span class="text-md text-gray-600">Following</span>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Personal</h3>
        <ul class="font-sans text-sm flex flex-col justify-around pb-6 h-full">
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
        <!-- <div class="space-y-4">
          <div v-for="project in employee.projects" :key="project.id" class="flex items-center space-x-4">
            <img :src="project.image" :alt="project.title" class="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h4 class="font-semibold text-gray-800">{{ project.title }}</h4>
              <p class="text-sm text-gray-600">
                Project #{{ project.id }} -
                <a href="#" class="text-purple-600 hover:underline">See project details</a>
              </p>
            </div>
          </div>
        </div> -->
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

<<<<<<< HEAD
watch(router.currentRoute, async (x: RouteLocationNormalizedLoadedGeneric, _y) => {
  const res = await apiClient.post('/personal/dni', {
    dni: parseInt(x.params.dni.toString())
  })

  perfil.value = res.data
})

const employee = ref({
  name: 'Adela Parkson',
  position: 'Product Designer',
  avatar: '../../assets/man.svg',
  posts: 17,
  followers: '9.7k',
  following: 274,
  storageUsed: 25,
  storageTotal: 50,
  generalInfo:
    'As we live, our hearts turn colder. Cause pain is what we go through as we become older. We get insulted by others, lose trust for those others. We get back stabbed by friends. It becomes harder for us to give others a hand. We get our heart broken by people we love, even that we give them all...',
  education: 'Stanford University',
  languages: ['English', 'Spanish', 'Italian'],
  department: 'Product Design',
  workHistory: ['Google', 'Facebook'],
  projects: [
    {
      id: 1,
      title: 'Technology behind the Blockchain',
      image: '/placeholder.svg?height=64&width=64'
    },
    {
      id: 2,
      title: 'Greatest way to a good Economy',
      image: '/placeholder.svg?height=64&width=64'
    }
  ]
})
=======

>>>>>>> 5f6f600c341c66883a3d84940f603fee35e42e54
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20vh, 30vh));
  column-gap: 1vh;
  row-gap: 2vh;
  justify-content: space-between;
  grid-template-rows: 1fr;
  width: 100%;

  .perfil {
    grid-column: span 2;
  }
}
</style>
