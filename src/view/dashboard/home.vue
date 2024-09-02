<script setup lang="ts">
import { addMonths, getDate, getDay, getDaysInMonth, getMonth, getYear, subMonths } from 'date-fns'
import { onMounted, ref } from 'vue'
import DiaCalendar from '@com/calendario/dia.vue'
import Eventos from '@com/calendario/evento.vue'
import { apiClient } from '../../tools/axios'

interface Campos {
  fecha: number
  descripcion: String
  id: string
  database: boolean
}

interface Cumples {
  dia: string
  nombres: Array<object>
}

const today = ref(new Date())
const hoy = ref(new Date())

const actividades = ref<Array<Campos>>([])

const cumples = ref<Array<Cumples>>([])

const loading = ref(true)

const consultar = async () => {
  try {
    actividades.value = []
    cumples.value = []
    loading.value = true

    const tressr: any = await apiClient.post('/agenda/', {
      año: getYear(today.value).toString(),
      mes: (getMonth(today.value) + 1).toString().padStart(2, '0'),
      diaf: getDaysInMonth(today.value).toString()
    })

    JSON.parse(tressr.data).results.forEach(
      (e: {
        id: string
        properties: {
          Descripcion: { title: { text: { content: any } }[] }
          Fecha: { date: { start: any } }
        }
      }) => {
        actividades.value?.push({
          descripcion: e.properties.Descripcion.title[0].text.content,
          fecha: parseInt(e.properties.Fecha.date.start.toString().split('-')[2]),
          id: e.id,
          database: false
        })
      }
    )

    actividades.value = actividades.value.sort((a, b) => a.fecha - b.fecha)

    loading.value = false

    const datab: any = await apiClient.post('/agenda/cumples', {
      año: getYear(today.value).toString(),
      mes: getMonth(today.value) + 1
    })

    datab.data.forEach((x: any) => {
      const { dia, nombres } = x

      const res = cumples.value.find((e) => e.dia === dia)
      if (res) {
        res.nombres.push(nombres)
      } else {
        cumples.value.push({ dia, nombres: [nombres] })
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const cambiarmes = async (resta: boolean) => {
  if (resta) {
    today.value = subMonths(today.value, 1)
  } else {
    today.value = addMonths(today.value, 1)
  }
  consultar()
}

const diasemana = () => {
  const dia = getDay(new Date(getYear(today.value), getMonth(today.value), 1)) - 1
  if (dia == -1) return 6
  return dia
}

const cambiar_a_ahora = () => {
  today.value = hoy.value
  consultar()
}

const isnow = (x: number) => {
  const fecha = new Date(getYear(today.value), getMonth(today.value), x)
  if (
    getMonth(hoy.value) == getMonth(fecha) &&
    getYear(fecha) == getYear(hoy.value) &&
    getDate(hoy.value) == getDate(fecha)
  )
    return true
  return false
}

onMounted(async () => {
  try {
    consultar()
  } catch (error) {}
})

const mesString = (mes: number) => {
  switch (mes) {
    case 1:
      return 'Enero'
    case 2:
      return 'Febrero'
    case 3:
      return 'Marzo'
    case 4:
      return 'Abril'
    case 5:
      return 'Mayo'
    case 6:
      return 'Junio'
    case 7:
      return 'Julio'
    case 8:
      return 'Agosto'
    case 9:
      return 'Septiembre'
    case 10:
      return 'Octubre'
    case 11:
      return 'Noviembre'
    default:
      return 'Diciembre'
  }
}
</script>
<template>
  <div class="mt-5 grid">
    <Eventos
      :eventos="actividades"
      :cumples="cumples"
      class="min-h-[80vh] max-h-[88vh] min-h-[80vh]"
    />
    <div class="card min-h-[80vh]">
      <header class="relative flex flex-col items-start justify-center">
        <div class="flex w-full justify-between items-center align-middle place-items-center">
          <div class="mb-px mt-3 text-2xl font-bold text-navy-700 dark:text-white text-center">
            Calendario
            <p class="px-5 font-dm text-sm font-normal text-gray-600 md:!px-0 xl:!px-8">
              {{ mesString(getMonth(today) + 1) }} {{ getYear(today) }}
            </p>
          </div>
          <div class="flex gap-5">
            <arrow-left-icon @click="cambiarmes(true)" size="34" class="button" />
            <calendar-icon @click="cambiar_a_ahora()" size="34" class="button" />
            <arrow-right-icon @click="cambiarmes(false)" size="34" class="button" />
          </div>
        </div>
      </header>
      <div class="calendario">
        <div class="semana border-[1px] border-gray-300 py-2">
          <span class="text-sm font-bold text-navy-700 dark:text-white">Lun</span>
          <span class="text-sm font-bold text-navy-700 dark:text-white">Mar</span>
          <span class="text-sm font-bold text-navy-700 dark:text-white">Mie</span>
          <span class="text-sm font-bold text-navy-700 dark:text-white">Jue</span>
          <span class="text-sm font-bold text-navy-700 dark:text-white">Vie</span>
          <span class="text-sm font-bold text-navy-700 dark:text-white">Sab</span>
          <span class="text-sm font-bold text-navy-700 dark:text-white">Dom</span>
        </div>
        <div class="cuerpo border-[0.2px] border-gray-300">
          <div v-for="_s in diasemana()" class="dia border-[0.2px] border-gray-300 py-2" />

          <DiaCalendar
            class="dia border-[0.2px] border-gray-300 py-2"
            v-for="x in getDaysInMonth(today)"
            v-if="!loading"
            :disable="false"
            :ocurrencias="actividades!.filter((e) => e.fecha == x)"
            :cumpleaños="cumples!.filter((e) => parseInt(e.dia) == x)"
            :day="x.toString()"
            :isnow="isnow(x)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.grid {
  grid-template-columns: minmax(20vh, 30vh) minmax(30vh, 50vw);
  grid-template-rows: 1fr;
  justify-content: space-evenly;
  column-gap: 2vh;
  height: max-content;
  width: 100%;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column-reverse;
  }
  .card {
    .calendario {
      padding-top: 2vh;
      display: grid;
      align-content: start;
      padding-left: 0;
      padding-right: 0;

      .semana {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        justify-items: center;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        border-bottom: none;
      }
      .cuerpo {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        column-gap: 0vh;
        border-right: none;

        border-bottom: none;

        .dia {
          height: 12vh;
          border-top: none;
          border-left: none;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped></style>
