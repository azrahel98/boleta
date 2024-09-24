<template>
  <div
    class="modal fade"
    id="editProfileModal"
    tabindex="-1"
    aria-labelledby="editProfileModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editProfileModalLabel">Editar Perfil</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="datos(perfil)" class="needs-validation" novalidate>
            <div class="text-center mb-4">
              <div class="position-relative d-inline-block">
                <img
                  v-if="imagePreview !== undefined"
                  alt="Profile"
                  :src="imagePreview"
                  class="rounded-circle"
                  style="width: 100px; height: 100px; object-fit: cover"
                />

                <img
                  v-else-if="perfil.imagen"
                  alt="Profile"
                  :src="`data:image/png;base64,${perfil.imagen}`"
                  class="rounded-circle"
                  style="width: 100px; height: 100px; object-fit: cover"
                />
                <img
                  v-else
                  alt="Profile"
                  src="../../assets/logo.png"
                  class="rounded-circle"
                  style="width: 100px; height: 100px; object-fit: cover"
                />
                <label
                  for="profilePicture"
                  class="position-absolute bottom-0 end-0 bg-light rounded-circle p-1 cursor-pointer"
                >
                  <IconCamera size="24" />
                  <input
                    id="profilePicture"
                    type="file"
                    @change="(e) => handleFileChange(e, perfil.dni)"
                    accept="image/*"
                    class="d-none"
                  />
                </label>
              </div>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">Nombres</label>
              <input id="name" type="text" class="form-control" :value="perfil.nombres" disabled />
            </div>

            <div class="mb-3">
              <label for="direccion" class="form-label">Dirección</label>
              <input
                id="direccion"
                type="text"
                class="form-control"
                v-model="perfil.direccion"
                required
              />
            </div>

            <div class="mb-3">
              <label for="telefono" class="form-label">Teléfono</label>
              <input
                id="telefono"
                type="tel"
                class="form-control"
                v-model="perfil.telefono"
                required
              />
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                type="email"
                class="form-control"
                v-model="perfil.correo"
                required
              />
            </div>

            <div class="mb-3">
              <label for="ruc" class="form-label">RUC</label>
              <input id="ruc" type="number" class="form-control" v-model="perfil.ruc" required />
            </div>

            <div class="mb-3">
              <label for="birthDate" class="form-label">Cumpleaños</label>
              <input
                id="birthDate"
                type="date"
                class="form-control"
                v-model="perfil.nacimiento"
                required
              />
            </div>

            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" class="btn btn-primary">Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiClient } from '../../tools/axios'

import { IconCamera } from '@tabler/icons-vue'

defineProps({
  perfil: { type: Object, required: true }
})

const datos = async (x: any) => {
  try {
    const data = await apiClient.post('/personal/actualizar', {
      direccion: x.direccion,
      telefono: x.telefono,
      correo: x.correo,
      ruc: x.ruc,
      nacimiento: x.nacimiento,
      dni: x.dni
    })
    console.log(data.data)
  } catch (error) {
    console.log(error)
  }
}

const file = ref<File | null>(null)
const imagePreview = ref<string | undefined>(undefined)

const handleFileChange = (e: Event, dni: any) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
    imagePreview.value = URL.createObjectURL(file.value)
  }
  uploadData(dni)
}

const uploadData = async (dni: any) => {
  try {
    const formData = new FormData()
    formData.append('file', file.value!)
    formData.append('dni', dni)

    await apiClient.post('/personal/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log('Imagen y datos subidos con éxito')
  } catch (error) {
    console.error('Error al subir los datos:', error)
  }
}
</script>
