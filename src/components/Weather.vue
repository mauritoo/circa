<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useWeatherStore } from '../store/weather';
import { useLocationStore } from '../store/location';

const weatherStore = useWeatherStore();
const locationStore = useLocationStore();
const placeName: ComputedRef<string> = computed(() => weatherStore.getName);
const placeState = computed(() => locationStore.selectedLocation?.state);
const placeCountry = computed(() => locationStore.selectedLocation?.country);
const temperature: ComputedRef<string> = computed(() =>
  weatherStore.getTemperature.toFixed(1)
);
// const minTemp: ComputedRef<number> = computed(() =>
//   Math.round(weatherStore.getMin)
// );
// const maxTemp: ComputedRef<number> = computed(() =>
//   Math.round(weatherStore.getMax)
// );
const weatherIcon = computed(
  () => `weathericons/${weatherStore.getIcon}@2x.png`
);
const description = computed(() => weatherStore.getDescription);
</script>

<template>
  <div class="weather text-left d-flex justify-space-between px-6 align-center">
    <div class="d-flex">
      <v-icon class="mr-2 pt-2">mdi-map-marker</v-icon>
      <div class="d-flex flex-column">
        <span class="text-h6">{{ placeName }}</span>
        <span class="text-caption">{{ placeState }}, {{ placeCountry }}</span>
      </div>
    </div>
    <div class="d-flex align-center">
      <div class="d-flex flex-column">
        <img :src="weatherIcon" />
      </div>
      <div class="d-flex flex-column">
        <span class="text-h4">{{ temperature }}°</span>
        <span class="text-caption">{{ description }}</span>
        <!-- <span class="text-caption">min: {{ minTemp }}°</span>
        <span class="text-caption">máx: {{ maxTemp }}°</span> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather {
  color: #ededed;
  border: solid 1px #7e9cdd;
  border-radius: 3px;
}
</style>
