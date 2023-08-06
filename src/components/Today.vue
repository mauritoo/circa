<script setup lang="ts">
  import { onMounted, computed, ComputedRef, ref } from "vue";
  import { useSunriseStore } from "../store/sunrise";
  import DayTimeline from "./DayTimeline.vue";

  const store = useSunriseStore();

  const dayTimeEvents = ref([
    {key: 'first_light', title: 'primera luz', color:"#D35400", value:''},
    {key: 'dawn', title: 'amanecer', color:'#E67E22', value:''},
    {key: 'sunrise', title: 'salida del sol', color: '#F39C12', value:''},
    {key: 'solar_noon', title: 'mediodía solar', color: '#F1C40F', value:''},
    {key: 'golden_hour', title: 'hora dorada', color: '#F1C40F', value:''},
    {key: 'sunset', title: 'puesta del sol', color: '#F39C12', value:''},
    {key: 'last_light', title: 'ultima luz', color:"#D35400", value:''},
    {key: 'now', title: '← ahora', color:"#71b6ff", value:''},
  ]);

  const lastProp = {key: 'day_length', title: 'duración del día', color:"#c2c2c2", value:''}

  const today = ref();
  const isLoading: ComputedRef<Boolean> = computed(() => store.isLoading );

    const formatTime = (text: String) => {
    if (!text) return ''
    try {
      const parts = text.split(" ")
      if (parts.length > 1 && parts[1] === 'PM') {
        const horaPartida = parts[0].split(':')
        horaPartida[0] = String(parseInt(horaPartida[0]) + 12)
        parts[0] = horaPartida.join(':')
      }
      return parts[0]
    } catch (e) {
      console.log(e)
      return 'error'
    }
  }

  const getAndSortInfo = async () => {
    today.value = await store.fetchTodayInfo();
    Object.keys(today.value).forEach((key) => {
      const index = dayTimeEvents.value.findIndex(dte => dte.key === key)
      if (index !== -1)
        dayTimeEvents.value[index] = {...dayTimeEvents.value[index], 'value': formatTime(today.value[key])}
    });
    const now = new Date();
    const timeNow = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    const nowIndex = dayTimeEvents.value.findIndex(dte => dte.key === 'now')
    dayTimeEvents.value[nowIndex] = {...dayTimeEvents.value[nowIndex], 'value': timeNow}
    // dayTimeEvents.value.sort((a,b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))
    dayTimeEvents.value.sort((a,b) => Date.parse('1970/01/01 ' + a.value.slice(0, -2) + ' ' + a.value.slice(-2)) - Date.parse('1970/01/01 ' + b.value.slice(0, -2) + ' ' + b.value.slice(-2)))
    lastProp.value = today.value['day_length'];
    dayTimeEvents.value.push(lastProp);
  }

  onMounted(() => {
    getAndSortInfo();
  });
</script>

<template>
  <div class="main-container">
    <div class="day pa-5">
      <div class="mb-6 pa-2 title text-center">LA POBLA DE VALLBONA</div>
      <div v-if="isLoading" class="day pa-5 text-center">
        Cargando...
      </div>
      <DayTimeline v-else :dayTimeEvents="dayTimeEvents"/>
      <div class="sub-container">
        <div class="sky">
          <div class="stars"></div>
          <div class="stars2"></div>
          <div class="stars3"></div>
          <div class="comet"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  color: #FFF;
}

</style>