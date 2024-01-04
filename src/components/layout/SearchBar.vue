<script setup lang="ts">
import { useSunriseStore } from '../../store/sunrise';
import { useLocationStore } from '../../store/location';
import { useWeatherStore } from '../../store/weather';
import { Ref, computed, ref, watch } from 'vue';
import { ComputedRef } from 'vue';

const sunriseStore = useSunriseStore();
const locationStore = useLocationStore();
const weatherStore = useWeatherStore();

const search = ref('');
const select = ref();
const locations: Ref<{ value: MyLocation; title: string }[]> = ref([]);
const loading: ComputedRef<boolean> = computed(() => locationStore.isLoading);

const fetchLocations = async () => {
  await locationStore.fetchLocations(search.value);
};

const hideNoData: ComputedRef<boolean> = computed(() => search.value === '');
const autoco = ref();

watch(
  () => locationStore.locations,
  function () {
    const storeLocations: MyLocation[] = locationStore.getLocations;
    locations.value = storeLocations.map((loc) => ({
      value: loc,
      title: `${loc.name}${loc.state ? ', ' + loc.state : ' '}${
        loc.country ? ', ' + loc.country : ''
      }`,
    }));
  }
);

watch(search, () => {
  search.value && search.value !== select.value && fetchLocations();
});
watch(select, async () => {
  if (select.value) {
    autoco.value.blur();
    const name: string = `${select.value.name} (${select.value.country})`;
    locationStore.selectLocation(select.value);
    await sunriseStore.fetchTodayInfo(
      name,
      Number(select.value.lat),
      Number(select.value.lon)
    );
    await weatherStore.fetchWeather(select.value.lat, select.value.lon);
  }
});

const noDataText: ComputedRef<string> = computed(() =>
  search.value && !loading.value ? 'No se encontraron resultados' : ''
);
</script>

<template>
  <v-form @submit.prevent>
    <v-autocomplete
      ref="autoco"
      v-model="select"
      v-model:search="search"
      :loading="loading"
      :items="locations"
      class="mx-2 flex-full-width"
      density="comfortable"
      prepend-inner-icon="mdi-magnify"
      :menu-props="{ closeOnContentClick: true }"
      hide-details
      :hide-no-data="hideNoData"
      item-props
      menu-icon=""
      single-line
      clearable
      theme="light"
      variant="solo"
    >
      <template #no-data>
        <span class="px-4">{{ noDataText }}</span>
      </template>
    </v-autocomplete>
    <div class="w-100 mt-2 clarify text-center">
      Buscá un lugar para ver las horas de salida y puesta del sol
    </div>
  </v-form>
</template>
<style lang="scss" scoped>
.place-name {
  font-size: 13px;
}
.state-country {
  color: rgb(199, 199, 199);
  font-size: 12px;
}
.clarify {
  font-size: 11px;
  font-style: italic;
  color: #ffffff;
}
:deep(.v-field) {
  box-shadow: none;
}
</style>
