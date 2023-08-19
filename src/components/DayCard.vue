<script setup lang="ts">
import { onMounted } from 'vue';
import { useSunriseStore } from '../store/sunrise';
import { formatTime } from '../helpers/time';
import { computed, ref } from 'vue';

const sunriseStore = useSunriseStore();

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

const today = computed(() => sunriseStore.today);

const getAndSortInfo = async () => {
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

const placeName = computed(() => sunriseStore.placeName);

const getItemClass = (index: number): string =>
  index === dayTimeEvents.value.length - 1
    ? 'last'
    : index === dayTimeEvents.value.length - 2
    ? 'previous'
    : '';

const getDotSize = (key: string) => (key !== 'now' ? '15px' : '8px');

const removeDay = () => sunriseStore.cleanLocalStorage();

onMounted(() => {
  getAndSortInfo();
});
</script>
<template>
  <v-card class="mx-4 mt-12 flex-wrap" rounded="xl" variant="flat">
    <div class="px-6 mt-4 mb-2 d-flex justify-space-between align-center">
      <div class="title">{{ placeName }}</div>
      <v-icon @click="removeDay">mdi-close-outline</v-icon>
    </div>
    <v-card-text>
      <v-timeline
        class="timeline"
        side="end"
        truncate-line="both"
        height="200px"
        line-color="#7a7a7a"
        line-thickness="2"
      >
        <v-timeline-item
          v-for="(evt, index) in dayTimeEvents"
          :key="evt.key"
          :dot-color="evt.color"
          :size="getDotSize(evt.key)"
          :class="getItemClass(index)"
        >
          <template v-slot:opposite>
            <span class="text-overline item-key">{{ evt.value }}</span>
          </template>
          <div class="text-body-2 item-text">{{ evt.title }}</div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
<style scoped lang="scss">
.timeline {
  /* height: 70vh !important; */
  grid-row-gap: 0px !important;
}
.item-text {
  /* color: rgb(164, 163, 163); */
  font-size: 12px !important;
}
.item-key {
  font-size: 14px !important;
}
:deep(.previous .v-timeline-divider__after),
:deep(.last .v-timeline-divider__before) {
  display: none;
}
:deep(.last) {
  margin-top: 10px;
}
.v-card {
  background-color: #ffffff;
}
</style>
