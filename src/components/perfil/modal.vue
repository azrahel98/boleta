<template>
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Editar Perfil</h2>
        <form class="space-y-4">
          <div class="flex justify-center mb-4">
            <div class="w-24 h-24 rounded-full overflow-hidden">
              <img
                v-if="imagePreview !== undefined"
                alt="Profile"
                :src="imagePreview"
                class="w-full h-full object-cover mask mask-circle"
              />
              <img
                v-else
                alt="Profile"
                :src="`data:image/png;base64,${perfil.imagen}`"
                class="w-full h-full object-cover mask mask-circle"
              />
            </div>
          </div>
          <div>
            <label for="picture" class="block text-sm font-medium text-gray-700"
              >Foto de Perfil</label
            >
            <input
              type="file"
              @change="(e) => handleFileChange(e, perfil.dni)"
              accept="image/*"
              class="py-1 text-sm"
            />
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombres</label>
            <input
              id="name"
              type="text"
              class="input !rounded-btn !p-1 h-min w-full"
              :value="perfil.nombres"
              disabled
            />
          </div>
          <div>
            <label for="id" class="block text-sm font-medium text-gray-700">Direccion</label>
            <input
              id="id"
              type="text"
              class="input !rounded-btn !p-1 h-min w-full"
              v-model="perfil.direccion"
            />
          </div>
          <div>
            <label for="id" class="block text-sm font-medium text-gray-700">Telefono</label>
            <input
              id="id"
              type="tel"
              class="input !rounded-btn !p-1 h-min w-full"
              v-model="perfil.telefono"
            />
          </div>
          <div>
            <label for="id" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="id"
              type="text"
              class="input !rounded-btn !p-1 h-min w-70p"
              v-model="perfil.correo"
            />
          </div>
          <div>
            <label for="Ruc" class="block text-sm font-medium text-gray-700">Ruc</label>
            <input
              id="Ruc"
              type="number"
              v-model="perfil.ruc"
              class="input !rounded-btn !p-1 h-min w-full"
            />
          </div>
          <div>
            <label for="birthDate" class="block text-sm font-medium text-gray-700"
              >Cumpleaños</label
            >
            <input
              id="birthDate"
              type="date"
              v-model="perfil.nacimiento"
              class="input !rounded-btn !p-1 h-min w-full"
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="datos(perfil)"
              class="px-4 py-2 bg-blueSecondary text-white rounded hover:bg-brandLinear"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { apiClient } from '../../tools/axios'

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
