<template>
  <div class="container pb-0 mb-0">
    <Avatar :perfil="perfil" class="avatar-profile" />
    <div class="pagina">
      <div class="lista">
        <Card v-for="job in vinculos" :job="job" />
      </div>

      <div class="info"></div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5vh;
  height: 100vh;
  width: 100%;

  padding: 0;

  .avatar-profile {
    padding-top: 7vh;
    height: max-content;
  }

  .pagina {
    display: grid;
    grid-template-columns: auto min-content;
    padding: 0;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
    overflow-y: auto;

    justify-items: center;
    .lista {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      row-gap: 5px;
      column-gap: 10px;
    }
    .info {
      //min-width: 250px;
    }
  }
}

.rows,
.row {
  padding: 0;
  margin: 0;
}
</style>
