<template>
  <div class="container">
    <Avatar :perfil="perfil" />
    <div class="pagina">
      <div class="container-lg">
        <div class="row row-cards">
          <div class="col-md-6 col-lg-3" v-for="x in 5">
            <div class="card">
              <div class="card-body p-4 text-center">
                <span class="avatar avatar-xl mb-3 rounded">JL</span>
                <h3 class="m-0 mb-1"><a href="#">Jeffie Lewzey</a></h3>
                <div class="text-secondary">Chemical Engineer</div>
                <div class="mt-3">
                  <span class="badge bg-green-lt">Admin</span>
                </div>
              </div>
              <div class="d-flex">
                <a href="#" class="card-btn"
                  ><!-- Download SVG icon from http://tabler-icons.io/i/mail -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon me-2 text-muted"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"
                    ></path>
                    <path d="M3 7l9 6l9 -6"></path>
                  </svg>
                  Email</a
                >
                <a href="#" class="card-btn"
                  ><!-- Download SVG icon from http://tabler-icons.io/i/phone -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon me-2 text-muted"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"
                    ></path>
                  </svg>
                  Call</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="informacion">
        <div class="card mb-4">
          <div class="card-body">
            <h3 class="card-title">Education</h3>
            <div v-for="(edu, index) in profile.education" :key="index" class="mb-3">
              <h4 class="mb-1">{{ edu.school }}</h4>
              <p class="mb-1">{{ edu.degree }}</p>
              <p class="text-muted">{{ edu.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="card mb-4">
      <div class="card-body">
        <h3 class="card-title">Experience</h3>
        <div v-for="(job, index) in profile.experience" :key="index" class="mb-3">
          <h4 class="mb-1">{{ job.title }}</h4>
          <p class="mb-1">
            <strong>{{ job.company }}</strong>
          </p>
          <p class="text-muted mb-2">{{ job.date }}</p>
          <p>{{ job.description }}</p>
        </div>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-body">
        <h3 class="card-title">Education</h3>
        <div v-for="(edu, index) in profile.education" :key="index" class="mb-3">
          <h4 class="mb-1">{{ edu.school }}</h4>
          <p class="mb-1">{{ edu.degree }}</p>
          <p class="text-muted">{{ edu.date }}</p>
        </div>
      </div>
    </div> -->
  </div>
  <!-- <div class="contenedor">
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
  </div> -->
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { apiClient } from '../../tools/axios'
import { router } from '../../router'
import modal from '../../components/perfil/modal.vue'
import { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import Avatar from '@com/perfil/avatar.vue'

const perfil = ref<any>({})

interface Job {
  title: string
  company: string
  date: string
  description: string
}

interface Education {
  school: string
  degree: string
  date: string
}

interface Profile {
  name: string
  headline: string
  location: string
  connections: number
  avatarUrl: string
  about: string
  experience: Job[]
  education: Education[]
  skills: string[]
}

const profile = ref<Profile>({
  name: 'Jane Doe',
  headline: 'Software Engineer | Vue.js | TypeScript | Node.js',
  location: 'San Francisco Bay Area',
  connections: 500,
  avatarUrl: 'https://placekitten.com/150/150',
  about:
    'Passionate software engineer with 5+ years of experience in building scalable web applications. Specialized in Vue.js, TypeScript, and Node.js. Always eager to learn new technologies and solve complex problems.',
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Innovators Inc.',
      date: 'Jan 2020 - Present',
      description:
        "Lead developer for the company's main SaaS product. Implemented new features, improved performance, and mentored junior developers."
    },
    {
      title: 'Software Engineer',
      company: 'Web Solutions LLC',
      date: 'Jun 2017 - Dec 2019',
      description:
        'Developed and maintained multiple client websites using Vue.js and Node.js. Collaborated with design team to implement responsive UI/UX.'
    }
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      date: '2013 - 2017'
    }
  ],
  skills: [
    'Vue.js',
    'TypeScript',
    'Node.js',
    'JavaScript',
    'HTML/CSS',
    'Git',
    'Agile Methodologies',
    'RESTful APIs',
    'MongoDB'
  ]
})

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
.pagina {
  display: grid;
  grid-template-columns: auto 30vw;
}
</style>
