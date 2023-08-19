<script setup lang="ts">
import { onMounted, computed, ComputedRef, ref } from 'vue';
import { useSunriseStore } from '../store/sunrise';
import DayTimeline from '../components/DayTimeline.vue';
import StarsContainer from '../components/StarsContainer.vue';

const store = useSunriseStore();

const dayTimeEvents = ref([
  { key: 'first_light', title: 'primera luz', color: '#D35400', value: '' },
  { key: 'dawn', title: 'amanecer', color: '#E67E22', value: '' },
  { key: 'sunrise', title: 'salida del sol', color: '#F39C12', value: '' },
  { key: 'solar_noon', title: 'mediodía solar', color: '#F1C40F', value: '' },
  { key: 'golden_hour', title: 'hora dorada', color: '#F1C40F', value: '' },
  { key: 'sunset', title: 'puesta del sol', color: '#F39C12', value: '' },
  { key: 'last_light', title: 'ultima luz', color: '#D35400', value: '' },
  { key: 'now', title: '← ahora', color: '#70D6FF', value: '' },
]);

const lastProp = {
  key: 'day_length',
  title: 'duración del día',
  color: '#c2c2c2',
  value: '',
};

const today = ref(store.today);
const placeName = ref('');
const isLoading: ComputedRef<Boolean> = computed(() => store.isLoading);

const formatTime = (text: String) => {
  if (!text) return '';
  try {
    const parts = text.split(' ');
    if (parts.length > 1) {
      const horaPartida = parts[0].split(':');
      if (parts[1] === 'PM') {
        horaPartida[0] = String(parseInt(horaPartida[0]) + 12);
      }
      parts[0] = horaPartida[0] + ':' + horaPartida[1];
    }
    return parts[0];
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

const getAndSortInfo = async () => {
  if (!today.value.first_light) {
    await store.fetchTodayInfo('LA POBLA DE VALLBONA');
    today.value = store.today;
    placeName.value = store.placeName;
  } else {
    placeName.value = store.placeName;
  }
  Object.keys(today.value).forEach((key) => {
    const index = dayTimeEvents.value.findIndex((dte) => dte.key === key);
    if (index !== -1)
      dayTimeEvents.value[index] = {
        ...dayTimeEvents.value[index],
        value: formatTime(today.value[key as keyof Day]),
      };
  });
  const now = new Date();
  const timeNow =
    now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
  const nowIndex = dayTimeEvents.value.findIndex((dte) => dte.key === 'now');
  dayTimeEvents.value[nowIndex] = {
    ...dayTimeEvents.value[nowIndex],
    value: timeNow,
  };
  dayTimeEvents.value.sort(
    (a, b) =>
      Date.parse(
        '1970/01/01 ' + a.value.slice(0, -2) + ' ' + a.value.slice(-2)
      ) -
      Date.parse('1970/01/01 ' + b.value.slice(0, -2) + ' ' + b.value.slice(-2))
  );
  lastProp.value = today.value['day_length'];
  dayTimeEvents.value.push(lastProp);
};

onMounted(() => {
  getAndSortInfo();
});
</script>

<template>
  <div class="main-container">
    <div class="day pa-5">
      <div class="mb-6 pa-2 title text-center">{{ placeName }}</div>
      <div v-if="isLoading" class="day pa-5 text-center">Cargando...</div>
      <DayTimeline v-else :dayTimeEvents="dayTimeEvents" />
      <StarsContainer />
    </div>
  </div>
</template>

<style scoped>
.title {
  color: #fff;
}
</style>
