<template>
  <!-- <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-[420px] min-w-[50vh]">
      <h4 class="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Iniciar sesión</h4>
      <div class="mb-6 flex items-center gap-3">
        <div class="h-px w-full bg-gray-200 dark:bg-navy-700"></div>
        <p class="text-base text-gray-600 dark:text-white">o</p>
        <div class="h-px w-full bg-gray-200 dark:bg-navy-700"></div>
      </div>
      <div class="mb-3">
        <label
          for="email"
          class="bg-red-500 text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
        >
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
      <button @click="login" :disabled="loading" class="btn btn-primary">Iniciar sesión</button>
    </div>
  </div> -->

  <section class="bg-light py-3 py-md-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <div class="card border border-light-subtle rounded-3 shadow-sm">
            <div class="card-body p-3 p-md-4 p-xl-5">
              <h2 class="fs-2 fw-bold text-start mb-4">Sign In</h2>
              <span class="text-secondary">Enter your email and password to sign in!</span>

              <form action="" class="pt-5">
                <div class="row gy-2 overflow-hidden">
                  <div class="col-12">
                    <div class="d-flex gap-1">
                      <label for="mail" class="form-label fw-medium">Correo </label>
                      <div class="text-primary">*</div>
                    </div>
                    <input
                      type="email"
                      class="form-control"
                      id="mail"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div class="col-12 mt-4">
                    <div class="d-flex gap-1">
                      <label for="mail" class="form-label fw-medium">Contraseña </label>
                      <div class="text-primary">*</div>
                    </div>
                    <input
                      type="email"
                      class="form-control"
                      id="mail"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div class="col-12">
                    <div class="d-flex gap-2 justify-content-between">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          name="rememberMe"
                          id="rememberMe"
                        />
                        <label class="form-check-label text-secondary" for="rememberMe">
                          Keep me logged in
                        </label>
                      </div>
                      <a href="#!" class="link-primary text-decoration-none">Forgot password?</a>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="d-grid my-3">
                      <button class="btn btn-primary btn-lg" type="submit">Log in</button>
                    </div>
                  </div>
                  <div class="col-12">
                    <p class="m-0 text-secondary text-center">
                      Don't have an account?
                      <a href="#!" class="link-primary text-decoration-none">Sign up</a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
