<script setup lang="ts">
</script>
<template>
  <v-bottom-navigation grow color="white"  style="height: 50px;">
    <v-btn value="search" to="/" class="menu-btn" exact>
      <v-icon icon="mdi-map-marker"></v-icon>
    </v-btn>
      <v-btn value="today" to="/today" class="menu-btn" exact>
        <v-icon>mdi-sun-clock</v-icon>
    </v-btn>
      <v-btn value="config" to="/config" class="menu-btn" exact>
        <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<style lang="scss" scoped>
.menu-btn {
  color: grey;
  height: 50px;
}
</style>