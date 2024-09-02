<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[420px] min-w-[50vh]">
      <h4 class="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Iniciar sesión</h4>
      <div class="mb-6 flex items-center gap-3">
        <div class="h-px w-full bg-gray-200 dark:bg-navy-700"></div>
        <p class="text-base text-gray-600 dark:text-white">o</p>
        <div class="h-px w-full bg-gray-200 dark:bg-navy-700"></div>
      </div>
      <div class="mb-3">
        <label for="email" class="text-sm text-navy-700 dark:text-white ml-1.5 font-medium">
          Usuario*
        </label>
        <input
          type="text"
          id="email"
          autocomplete="off"
          v-model="form.username"
          placeholder="usuario **"
          :class="{ 'border-red-600': errores?.username != null }"
          class="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
        />
        <div v-if="errores?.username" class="text-red-600">
          <span v-for="er in errores.username?._errors">{{ er }}</span>
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="text-sm text-navy-700 dark:text-white ml-1.5 font-medium">
          Contraseña*
        </label>
        <input
          type="password"
          id="password"
          autocomplete="off"
          v-model="form.password"
          placeholder="Min. 8 caracteres"
          :class="{ 'border-red-600': errores?.password != null }"
          class="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
        />
        <div v-if="errores?.password" class="text-red-600">
          <span v-for="er in errores.password?._errors">{{ er }}</span>
        </div>
      </div>
      <button
        @click="login"
        :disabled="loading"
        class="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
      >
        Iniciar sesión
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import * as z from 'zod'
import { router } from '../router'
import { apiClient } from '../tools/axios'
const form = reactive({
  username: '',
  password: ''
})

const loading = ref(false)

const formSchema = z.object({
  username: z.string().min(1, { message: 'No debe ser vacio' }),
  password: z.string().min(1, { message: 'No debe ser vacio' })
})

type formSchemaType = z.infer<typeof formSchema>
const errores = ref<z.ZodFormattedError<formSchemaType> | null>(null)

const login = async () => {
  loading.value = true
  try {
    const valid = formSchema.safeParse(form)
    errores.value = null

    if (!valid.success) {
      errores.value = valid.error.format()
    } else {
      const data = await apiClient.post('/api/login', {
        nickname: form.username,
        password: form.password
      })
      localStorage.setItem('jwt', data.data.token)

      router.push({ name: 'home' })
    }
  } catch (error) {
    var er = error as any
    if (er.response.data.code == 1) {
      errores.value = {
        _errors: [],
        username: {
          _errors: [er.response.data.message]
        }
      }
    } else if (er.response.data.code == 2) {
      errores.value = {
        _errors: [],
        password: {
          _errors: [er.response.data.message]
        }
      }
    }
  }
  loading.value = false
}
</script>
