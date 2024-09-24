<template>
  <div class="card pb-0 mb-0">
    <div class="card-body">
      <div>
        <h5 class="card-title">{{ job.area }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ job.cargo }}</h6>
      </div>
      <ul class="list-unstyled">
        <li class="mb-2">
          <IconCalendar size="20" class="text-primary fw-bold" />
          <span class="text-muted"> Ingreso:</span> {{ job.ingreso }}
        </li>
        <li class="mb-2">
          <IconCashBanknote size="20" />
          <span class="text-muted"> Sueldo:</span> {{ job.sueldo }}
        </li>
        <li class="mb-2">
          <IconBriefcase size="20" />
          <span class="text-muted"> Régimen:</span>
          {{ job.regimen }}
        </li>
        <li v-if="job.renuncia" class="mb-2">
          <IconArrowRight size="20" class="text-danger" />
          <span class="text-muted"> Renuncia:</span>
          {{ job.renuncia }}
        </li>
      </ul>
    </div>
    <div class="card-footer bg-transparent">
      <small
        class="text-primary"
        :class="[job.activo === 'N' ? 'text-danger' : 'text-primary fw-bold']"
      >
        {{ job.activo === 'N' ? 'Finalizado' : 'Activo' }}
      </small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCalendar, IconCashBanknote, IconBriefcase, IconArrowRight } from '@tabler/icons-vue'

defineProps({
  job: { type: Object, required: true }
})
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 35vh;
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 5svh;
  }
  .card-title {
    font-size: 1.125rem;
    font-weight: bold;
  }
  .card-subtitle {
    font-size: 0.875rem;
  }
  .mb-2 {
    font-size: 0.875rem;
    span {
      font-weight: 600;
    }
  }
}
</style>
