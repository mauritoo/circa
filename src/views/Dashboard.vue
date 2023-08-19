<script setup lang="ts">
import { onMounted, computed, ComputedRef } from 'vue';
import { useSunriseStore } from '../store/sunrise';
import DayCard from '../components/DayCard.vue';
import SearchBar from '../components/layout/SearchBar.vue';

const store = useSunriseStore();
const isLoading: ComputedRef<Boolean> = computed(() => store.isLoading);
const dayLoaded: ComputedRef<Boolean> = computed(() => store.dayLoaded);

onMounted(() => {
  store.checkLocalStorage();
});
</script>

<template>
  <div class="main-container w-100">
    <div class="day pa-2">
      <div class="w-100 text-center title mt-4">CIRCA</div>
      <SearchBar class="mt-8 px-2" />
      <div class="w-100 mt-2 clarify px-4">
        Buscá un lugar para ver las horas de salida y puesta del sol
      </div>
      <div v-if="isLoading" class="day pa-5 text-center">Cargando...</div>
      <DayCard v-else-if="dayLoaded" />
    </div>
  </div>
</template>

<style scoped>
.clarify {
  font-size: 12px;
}
</style>
