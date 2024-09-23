<template>
  <section class="bg-light py-3 py-md-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <div class="card border border-light-subtle rounded-3 shadow-sm">
            <div class="card-body p-3 p-md-4 p-xl-5">
              <h2 class="fs-2 fw-bold text-start mb-4">Sign In</h2>
              <span class="text-secondary">Ingresa su usuario y contraseña</span>

              <form class="pt-5" @submit.prevent="login" autocomplete="off">
                <div class="row gy-2 overflow-hidden">
                  <div class="col-12">
                    <div class="d-flex gap-1">
                      <label for="mail" class="form-label fw-medium">Correo </label>
                      <div class="text-primary">*</div>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errores?.username != null }"
                      v-model="form.username"
                      id="mail"
                      placeholder="rscl"
                      required
                      autocomplete="off"
                    />
                    <div v-if="errores?.username" class="text-danger">
                      <span v-for="er in errores.username?._errors">{{ er }}</span>
                    </div>
                  </div>
                  <div class="col-12 mt-4">
                    <div class="d-flex gap-1">
                      <label for="mail" class="form-label fw-medium">Contraseña </label>
                      <div class="text-primary">*</div>
                    </div>
                    <input
                      type="password"
                      :class="{ 'is-invalid': errores?.password != null }"
                      v-model="form.password"
                      required
                      class="form-control"
                      id="password"
                      placeholder="name@example.com"
                      autocomplete="off"
                    />
                    <div v-if="errores?.password" class="text-danger">
                      <span v-for="er in errores.password?._errors">{{ er }}</span>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="d-grid my-3">
                      <button
                        class="btn btn-primary btn-lg"
                        :disabled="loading"
                        :class="{ 'is-loading': loading }"
                        type="submit"
                      >
                        Log in
                      </button>
                    </div>
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

<style lang="scss" scoped>
.is-loading {
  cursor: not-allowed;
}

.is-invalid {
  border: 1px solid red;
  transition: border-color 1.2s linear;
}
</style>
