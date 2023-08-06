<script setup lang="ts">
import router from "../router";
import { useSunriseStore } from "../store/sunrise";
import { computed, ref } from 'vue';

const store = useSunriseStore();

  const loading = ref(false)
  const model = ref({
    name: '',
    lat: '',
    lng: '',
  })
  const isSearchError = computed(() => store.isError)
  const isSearchOk = computed(() => store.isResponseOk)
  const searchPlace = async () => {
    await store.fetchTodayInfo(model.value.name, Number(model.value.lat), Number(model.value.lng))
    if (isSearchError) {
      router.push('/today')
    }
  }

</script>
<template>
  <div class='select text-center mt-10'>Select place
  <v-sheet width="300" class="mx-auto mt-10">
    <v-form @submit.prevent>
      <v-text-field
        v-model="model.name"
        label="Nombre"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-model="model.lat"
        label="Latitud"
        type="number"
        variant="underlined"
        ></v-text-field>
        <v-text-field
        v-model="model.lng"
        label="Longitud"
        type="number"
        variant="underlined"
      ></v-text-field>
      <v-btn 
        :loading="loading" 
        prepend-icon="mdi-open-in-new" 
        type="submit" 
        variant="outlined"
        @click="searchPlace" 
        block class="mt-2">
          BUSCAR
      </v-btn>
    </v-form>
  </v-sheet>
  <div v-if="isSearchError">
    Error!
  </div>
  <div v-if="isSearchOk" class="mt-10">
    <router-link to="/today">Verrr</router-link>
    Ver datos de {{model.name}}
  </div>
</div>
</template>
<style lang="scss" scoped>
.select {
  color: white
}
</style>