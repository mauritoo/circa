<script setup lang="ts">
  import { onMounted, computed } from "vue";
  import { useSunriseStore } from "../store/sunrise";
  const store = useSunriseStore();

  const propsToShow = [
    'first_light',
    'dawn',
    'sunrise',
    'solar_noon',
    'golden_hour',
    'sunset',
    'last_light',
    'day_length',
  ]
  const formatKey = (key: String) => key.replace('_',' ')

  const today = computed(() => store.today);
  onMounted(() => {
    store.fetchTodayInfo();
  });
</script>

<template>
  <div class="day pa-10">
    <div class="mb-2 pa-4 title text-center">la Pobla de Vallbona</div>
    <v-divider class="px-5"></v-divider>
    <v-list lines="two">
    <v-list-item
      v-for="key in propsToShow"
      :key="key"
      :title="today[key]"
      :subtitle="formatKey(key)"
    ></v-list-item>
  </v-list>
  </div>
</template>

<style scoped>
.day {
  --tw-bg-opacity: 1;
  background-color: rgb(175 150 251 / var(--tw-bg-opacity));
}
.v-list {
  background-color: transparent;
}
:deep(.v-list-item-title) {
  font-weight: bold !important;
}
:deep(.v-list-item-subtitle) {
  color: white !important;
}
.title {
  --tw-bg-opacity: 1;
  background-color: rgb(190 255 108 / var(--tw-bg-opacity));
  opacity: 1;
  font-weight: 800;
}
</style>