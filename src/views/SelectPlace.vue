<script setup lang="ts">
import router from '../router';
import { useSunriseStore } from '../store/sunrise';
import { useLocationStore } from '../store/location';
import { computed, ref, watch } from 'vue';

const sunriseStore = useSunriseStore();
const locationStore = useLocationStore();

const search = ref();
const select = ref();
const locations = ref();
const lastLocations = ref<MyLocation[]>([]);
// const model = ref({
//   name: '',
//   lat: '',
//   lng: '',
// })
const isSearchError = computed(() => sunriseStore.isError);
// const isSearchOk = computed(() => sunriseStore.isResponseOk)
const loading = computed(() => locationStore.isLoading);
// const searchPlace = async () => {
//   await sunriseStore.fetchTodayInfo(model.value.name, Number(model.value.lat), Number(model.value.lng))
//   if (isSearchError.value) {
//     router.push('/today')
//   }
// }

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

watch(search, () => {
  search.value && search.value !== select.value && fetchLocations();
});
watch(select, async () => {
  if (select.value) {
    console.log('cambio la seleccion', select.value);
    await sunriseStore.fetchTodayInfo(
      select.value.name,
      Number(select.value.lat),
      Number(select.value.lon)
    );
    console.log(sunriseStore.today);
    if (!isSearchError.value) {
      router.push('/today');
    }
  }
});

const noDataText = computed(() =>
  search.value && !loading.value ? 'No se encontraron resultados' : ''
);
lastLocations.value = [
  {
    name: 'Hurlingham',
    state: 'Buenos Aires',
    country: 'AR',
    lat: 123,
    lon: 435,
  },
  {
    name: 'Bella vista',
    state: 'Montevideo',
    country: 'UY',
    lat: 123,
    lon: 435,
  },
  {
    name: 'Chapadmalal',
    state: 'Buenos Aires',
    country: 'AR',
    lat: 123,
    lon: 435,
  },
];
</script>
<template>
  <div class="select px-6 mt-5">
    <v-sheet width="300" class="mx-auto mt-10">
      <v-form @submit.prevent>
        <v-autocomplete
          v-model="select"
          v-model:search="search"
          :loading="loading"
          :items="locations"
          class="mx-2"
          density="comfortable"
          hide-details
          :auto-select-first="true"
          label="Buscá un lugar..."
          variant="outlined"
        >
          <template #no-data>
            <span class="px-4">{{ noDataText }}</span>
          </template>
        </v-autocomplete>
      </v-form>
    </v-sheet>
    <div class="mt-10 mb-5">Tus últimas búsquedas</div>
    <div v-if="lastLocations.length > 0">
      <v-card
        v-for="location in lastLocations"
        :key="location.lon"
        class="pa-5 mb-2 d-flex align-center"
        variant="outlined"
      >
        <v-icon>mdi-sun-clock</v-icon>
        <div class="info ml-4">
          <p class="place-name">{{ location.name }}</p>
          <p v-if="location.country || location.state" class="state-country">
            {{
              (location.state ? location.state : '') +
              (location.country ? ', ' + location.country : '')
            }}
          </p>
        </div>
      </v-card>
    </div>
    <!-- <div v-if="isSearchError">
      Error!
    </div> -->
    <!-- <div v-if="isSearchOk" class="mt-10">
      <router-link to="/today">Verrr</router-link>
      Ver datos de {{model.name}}
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.select {
  color: white;
}
:deep(.v-field__append-inner) {
  display: none;
}
.place-name {
  font-size: 13px;
}
.state-country {
  color: rgb(199, 199, 199);
  font-size: 12px;
}
</style>
