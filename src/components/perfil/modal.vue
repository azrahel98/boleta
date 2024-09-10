<template>
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Editar Perfil</h2>
        <form class="space-y-4">
          <div class="flex justify-center mb-4">
            <div class="w-24 h-24 rounded-full overflow-hidden">
              <img
                alt="Profile"
                :src="image_preview"
                class="w-full h-full object-cover mask mask-circle"
              />
            </div>
          </div>
          <div>
            <label for="picture" class="block text-sm font-medium text-gray-700"
              >Foto de Perfil</label
            >
            <input id="picture" type="file" accept="image/*" @change="subir" class="py-1 text-sm" />
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
              type="submit"
              class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
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

defineProps({
  perfil: { type: Object, required: true }
})

const image_preview = ref<undefined | string>(undefined)
const subir = async (e: any) => {
  try {
    const formData = new FormData()
    formData.append('file', e.target.files[0])

    image_preview.value = URL.createObjectURL(e.target.files[0])
  } catch (error) {
    console.log(error)
  }
}
</script>
