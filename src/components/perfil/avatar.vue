<template>
  <div class="profile-header container text-dark p-3">
    <div class="row align-items-center">
      <div class="col-auto">
        <div class="position-relative">
          <div
            class="profile-picture bg-secondary rounded-circle d-flex align-items-center justify-content-center"
            style="width: 100px; height: 100px"
          >
            <img
              v-if="perfil.imagen == undefined"
              alt="Profile"
              src="../../assets/logo.png"
              class="rounded-circle"
              style="width: 100px; height: 100px; object-fit: cover"
            />
            <img
              v-else
              alt="Profile"
              :src="`data:image/png;base64,${perfil.imagen}`"
              class="rounded-circle"
              style="width: 100px; height: 100px; object-fit: cover"
            />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h2 class="mb-0" style="text-transform: lowercase">{{ perfil.nombres }}</h2>
          <div>
            <button
              class="btn btn-outline-info"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              Editar
            </button>
            <ModalPerfil :perfil="perfil" />
          </div>
        </div>
        <div
          class="d-flex mb-2 flex-wrap row-gap-0 column-gap-2 p-0 m-0 justify-content-evenly me-5"
        >
          <div class="me-4 info p-0 m-0" v-if="perfil.direccion != null">
            <IconHome2 size="24" />
            <span>{{ perfil.direccion }}</span>
          </div>
          <div class="me-4 info" v-if="perfil.telefono != null">
            <IconPhone size="24" />
            <span>{{ perfil.telefono }}</span>
          </div>
          <div class="me-4 info" v-if="perfil.correo != null">
            <IconMailAi size="24" />
            <span>{{ perfil.correo }}</span>
          </div>
          <div class="me-4 info" v-if="perfil.nacimiento != null">
            <IconCake size="24" />
            <span>{{ perfil.nacimiento }}</span>
          </div>
          <div class="me-4 info" v-if="perfil.ruc != null">
            <IconBuildingBank size="24" />
            <span>{{ perfil.ruc }}</span>
          </div>
        </div>
        <p class="mb-0 text-muted">@{{ perfil.dni }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalPerfil from './/modal.vue'
import {
  IconCamera,
  IconHome2,
  IconPhone,
  IconMailAi,
  IconCake,
  IconBuildingBank
} from '@tabler/icons-vue'

defineProps({
  perfil: { type: Object, required: true }
})
</script>

<style scoped>
.profile-header {
  font-family: Arial, sans-serif;
}

.info {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.btn {
  font-size: 14px;
}
</style>
