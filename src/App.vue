<script setup lang="ts">
  import Menu from "./components/layout/Menu.vue";
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;height: calc(100vh + 56px);margin-bottom: 30px;">
      <router-view></router-view>
    </v-main>
    <Menu />
  </v-layout>
</template>

<style scoped>
</style>
