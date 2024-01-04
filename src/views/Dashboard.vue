<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useWeatherStore } from '../store/weather';
import DayCard from '../components/DayCard.vue';
import Weather from '../components/Weather.vue';
import SearchBar from '../components/layout/SearchBar.vue';
import logoUrl from '../assets/images/logo_name.svg';
import { useSunriseStore } from '../store/sunrise';

const weatherStore = useWeatherStore();
const sunriseStore = useSunriseStore();
const isLoading: ComputedRef<Boolean> = computed(() => weatherStore.isLoading);
const weatherLoaded: ComputedRef<Boolean> = computed(
  () => Object.keys(weatherStore.getWeather).length > 0
);
const dayLoaded: ComputedRef<Boolean> = computed(() => sunriseStore.dayLoaded);

// onMounted(() => {
//   store.checkLocalStorage();
// });
</script>

<template>
  <div class="main-container w-100 px-2">
    <!-- <div class="w-100 text-center title my-3">CIRCA</div> -->
    <img class="app-logo px-10 mt-6" :src="logoUrl" height="30" />
    <v-col
      class="below-title d-flex flex-column"
      cols="12"
      md="3"
      offset-md="3"
    >
      <SearchBar class="mt-4 px-2" />
      <!-- <Transition name="slide-fade">
      </Transition> -->
    </v-col>
    <div v-if="isLoading" class="day mt-15 text-center">
      <v-progress-circular indeterminate color="white"></v-progress-circular>
    </div>
    <div v-if="weatherLoaded && !isLoading" class="mt-8 px-4">
      <Weather />
    </div>
    <DayCard v-if="dayLoaded && !isLoading" />
  </div>
</template>

<style lang="scss" scoped>
.title {
  color: #ffffff;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s;
}

.slide-fade-enter-from {
  transform: translateY(300px);
}
.slide-fade-leave-to {
  transform: translateX(360px);
}
</style>
