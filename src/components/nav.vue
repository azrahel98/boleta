<template>
  <div class="nav">
    <h1></h1>
    <div class="card border-0">
      <div>
        <input
          type="text"
          class="form-control bg-light dropdown-toggle"
          v-model="search"
          aria-haspopup="true"
          @keyup.prevent="buscar"
          aria-expanded="false"
          data-bs-toggle="dropdown"
        />
        <div class="dropdown-menu dropdown-menu-right">
          <button class="dropdown-item" type="button" v-for="x in personas" @click="ruta(x.dni)">
            {{ x.nombres }}
          </button>
        </div>
      </div>
      <div class="d-flex justify-content-center mx-1">
        <button class="btn btn-sm" @click="toggle()">&#9776;</button>
        <div class="avatar">
          <img src="../assets/logo.png" class="img-fluid rounded-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiClient } from '../tools/axios'
import { router } from '../router'

defineProps({
  open: { type: Boolean, required: true },
  toggle: { type: Function, required: true }
})
const personas = ref<Array<any>>([])

const search = ref('')

const buscar = async () => {
  try {
    if (search.value.length > 3) {
      personas.value = []

      const datos = await apiClient.post('/personal/buscar', {
        nombre: search.value
      })
      personas.value = datos.data
    }
  } catch (error) {
    console.log(error)
  }
}

const ruta = (dni: string) => {
  personas.value = []
  search.value = ''

  router.replace({ name: 'perfil', params: { dni } })
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  .card {
    margin: 0;
    margin-right: 2vw;
    margin-top: 1vh;
    border-radius: 20px;
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.6vh 0.3vw 0.6vh 0.3vw;

    .dropdown-menu {
      margin-top: 2vh;
      max-height: 50vh;
      overflow-y: auto;
      font-size: 14px;
      font-size: 400;
      background-color: white;
    }

    input {
      border-radius: 20px;
      border: none;
      font-size: 14px;
      font-weight: normal;
    }
    :active,
    :focus-visible,
    :focus {
      box-shadow: none;
    }
    .avatar {
      width: 2.2rem;
      height: 2.2rem;
    }
  }
}
</style>
