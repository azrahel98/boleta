<template>
  <div class="container pb-0 mb-0">
    <Avatar :perfil="perfil" />
    <div class="pagina">
      <div class="container-lg pb-0 mb-0">
        <div class="row rows-cards pb-0 mb-0 row-gap-3">
          <div class="col-md-6 col-lg-3" v-for="job in vinculos">
            <Card :job="job" />
          </div>
        </div>
      </div>
      <div class="informacion">
        <div class="card mb-4">
          <div class="card-body">
            <h3 class="card-title">Education</h3>
            <!-- <div v-for="(edu, index) in profile.education" :key="index" class="mb-3">
              <h4 class="mb-1">{{ edu.school }}</h4>
              <p class="mb-1">{{ edu.degree }}</p>
              <p class="text-muted">{{ edu.date }}</p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { apiClient } from '../../tools/axios'
import { router } from '../../router'
import { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import Avatar from '@com/perfil/avatar.vue'
import Card from '@com/perfil/card.vue'

const perfil = ref<any>({})
const vinculos = ref<Array<any>>([])

onMounted(async () => {
  const res = await apiClient.post('/personal/dni', {
    dni: parseInt(router.currentRoute.value.params.dni.toString())
  })

  const vincu = await apiClient.post('/personal/vinculos', {
    dni: parseInt(router.currentRoute.value.params.dni.toString())
  })
  vinculos.value = vincu.data
  perfil.value = res.data
})

watch(router.currentRoute, async (x: RouteLocationNormalizedLoadedGeneric, _y) => {
  const res = await apiClient.post('/personal/dni', {
    dni: parseInt(x.params.dni.toString())
  })
  const vincu = await apiClient.post('/personal/vinculos', {
    dni: parseInt(router.currentRoute.value.params.dni.toString())
  })
  vinculos.value = vincu.data

  perfil.value = res.data
})
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  height: 92vh;
  grid-template-rows: min-content auto;
  .pagina {
    display: grid;
    overflow-y: auto;
    height: 100%;
    grid-template-columns: auto min-content;
    width: 100%;
  }
}
</style>
