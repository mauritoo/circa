<script setup lang="ts">
  import { onMounted, computed, ComputedRef } from "vue";
  import { useSunriseStore } from "../store/sunrise";

  interface Day {
    'first_light': string,
    'dawn': string,
    'sunrise': string,
    'solar_noon': string,
    'golden_hour': string,
    'sunset': string,
    'last_light': string,
    'day_length': string,
  }

  const store = useSunriseStore();

  const propsToShow = [
    {key: 'first_light', text: 'primera luz', color:"#D35400"},
    {key: 'dawn', text: 'amanecer', color:'#E67E22'},
    {key: 'sunrise', text: 'salida del sol', color: '#F39C12'},
    {key: 'solar_noon', text: 'mediodía solar', color: '#F1C40F'},
    {key: 'golden_hour', text: 'hora dorada', color: '#F1C40F'},
    {key: 'sunset', text: 'puesta del sol', color: '#F39C12'},
    {key: 'last_light', text: 'ultima luz', color:"#D35400"},
    {key: 'day_length', text: 'duración del día', color:"#c2c2c2"},
  ]
  const formatKey = (key: String) => key.replace('_',' ')
  const formatTime = (text: String) => {
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
  const getItemClass = (index: number): string =>
  index === propsToShow.length-1 ? 'last': (index === propsToShow.length-2 ? 'previous' : '')  

  const today: ComputedRef<Day> = computed(() => store.today as Day);
  const isLoading: ComputedRef<Boolean> = computed(() => store.isLoading );
  onMounted(async () => {
    await store.fetchTodayInfo();
  });
</script>

<template>

  <div class="day pa-5">
    <div class="mb-6 pa-2 title text-center">LA POBLA DE VALLBONA</div>
    <!-- <v-divider class="px-2"></v-divider> -->
    <div v-if="isLoading" class="day pa-5 text-center">
    Cargando...
  </div>
    <v-timeline v-else side="end" truncate-line="both">
      <v-timeline-item
        v-for="prop, index in propsToShow"
        :key="prop.key"
        :dot-color="prop.color"
        size="15px"
        :class="getItemClass(index)"
      >
      <template v-slot:opposite>
        <span class="text-overline item-key">{{ formatTime(today[prop.key as keyof Day]) }}</span>
      </template>
      <div class="text-body-2 item-text">{{ formatKey(prop.text) }}</div>




        <!-- <div class="d-flex flex-column">
          <span class="text-overline item-key">{{ formatTime(today[prop.key as keyof Day]) }}</span>
          <div class="text-body-2 item-text">{{ formatKey(prop.text) }}</div>
        </div> -->
    </v-timeline-item>
    </v-timeline>
    
    
    
    <!-- SIMPLE LIST -->
    <!-- <v-divider class="px-2"></v-divider> -->
    <!-- <v-list lines="two">
      <v-list-item
      v-for="prop in propsToShow"
      :key="prop.key"
      :title="formatTime(today[prop.key as keyof Day])"
      :subtitle="formatKey(prop.text)"
      ></v-list-item>
    </v-list> -->
  </div>
</template>

<style scoped>
.day {
  --tw-bg-opacity: 1;
  color: #FFF;
}
.item-text {
  color: rgb(164, 163, 163);
}
.item-key {
  font-size: 14px !important;
  color: #FFF;
}
:deep(.v-timeline-divider__before),:deep(.v-timeline-divider__after) {
  background: rgb(122, 122, 122);
}
:deep(.previous .v-timeline-divider__after),:deep(.last .v-timeline-divider__before) {
  display: none;
}
:deep(.last) {
  margin-top: 10px;
}
.v-list {
  /* background-color: transparent; */
}
:deep(.v-list-item-title) {
  /* font-weight: bold !important; */
}
:deep(.v-list-item-subtitle) {
  /* font-style: italic; */
  /* color: white !important; */
}
.title {
  --tw-bg-opacity: 1;
  /* background-color: rgb(190 255 108 / var(--tw-bg-opacity)); */
  opacity: 1;
  /* font-weight: 800; */
}
</style>