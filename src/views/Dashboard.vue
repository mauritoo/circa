<script setup lang="ts">
import { onMounted, computed, ComputedRef } from 'vue';
import { useSunriseStore } from '../store/sunrise';
import DayCard from '../components/DayCard.vue';
import SearchBar from '../components/layout/SearchBar.vue';
import logoUrl from '../assets/images/white-logo.svg';

const store = useSunriseStore();
const isLoading: ComputedRef<Boolean> = computed(() => store.isLoading);
const dayLoaded: ComputedRef<Boolean> = computed(() => store.dayLoaded);

onMounted(() => {
  store.checkLocalStorage();
});
</script>

<template>
  <div class="main-container w-100 px-2 text-center">
    <!-- <div class="w-100 text-center title my-3">CIRCA</div> -->
    <img class="app-logo px-10 mt-2" :src="logoUrl" />
    <div class="below-title d-flex flex-column">
      <SearchBar class="mt-4 px-2" />
      <div v-if="isLoading" class="day mt-15 text-center">
        <v-progress-circular indeterminate color="white"></v-progress-circular>
      </div>
      <Transition name="slide-fade">
        <DayCard v-if="dayLoaded && !isLoading" />
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  color: #ffffff;
}
.app-logo {
  height: 50px;
}
.below-title {
  height: calc(100% - 65px);
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
