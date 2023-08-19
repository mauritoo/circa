<script setup lang="ts">
import { useSunriseStore } from '../../store/sunrise';
import { useLocationStore } from '../../store/location';
import { computed, ref, watch } from 'vue';

const sunriseStore = useSunriseStore();
const locationStore = useLocationStore();

const search = ref('');
const select = ref();
const locations = ref();
const loading = computed(() => locationStore.isLoading);

const fetchLocations = async () => {
  const response: MyLocation[] = await locationStore.fetchLocations(
    search.value
  );
  if (response && response.length > 0)
    locations.value = response.map((loc) => ({
      value: loc,
      title: `${loc.name} ${loc.state ? ', ' + loc.state : ''} ${
        loc.country ? ', ' + loc.country : ''
      }`,
    }));
};

const hideNoData = computed(() => search.value === '');

watch(search, () => {
  search.value && search.value !== select.value && fetchLocations();
});
watch(select, async () => {
  if (select.value) {
    const name = `${select.value.name} (${select.value.country})`;
    await sunriseStore.fetchTodayInfo(
      name,
      Number(select.value.lat),
      Number(select.value.lon)
    );
  }
});

const noDataText = computed(() =>
  search.value && !loading.value ? 'No se encontraron resultados' : 'perrito'
);
</script>

<template>
  <v-sheet class="mx-auto">
    <v-form @submit.prevent>
      <v-autocomplete
        v-model="select"
        v-model:search="search"
        :loading="loading"
        :items="locations"
        class="mx-2 flex-full-width"
        density="comfortable"
        hide-details
        :hide-no-data="hideNoData"
        placeholder="Buscar..."
        item-props
        menu-icon=""
        single-line
        rounded
        clearable
        theme="light"
        variant="solo"
      >
        <template #no-data>
          <span class="px-4">{{ noDataText }}</span>
        </template>
      </v-autocomplete>
    </v-form>
  </v-sheet>
</template>
<style lang="scss" scoped>
.place-name {
  font-size: 13px;
}
.state-country {
  color: rgb(199, 199, 199);
  font-size: 12px;
}
</style>