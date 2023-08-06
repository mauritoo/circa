<script setup lang="ts">

  const props = defineProps({
    dayTimeEvents: {
      type: Array<TimeEvent>,
      required: true
    },
  })

  const getItemClass = (index: number): string =>
    index === props.dayTimeEvents.length-1 
    ? 'last'
    : (index === props.dayTimeEvents.length-2 
      ? 'previous' 
      : '')  

  const getDotSize = (key: string) => 
    key !== 'now' ? "15px" : "8px"
</script>
<template>
    <v-timeline 
      class="timeline" 
      side="end"
      truncate-line="both"
      height="200px"
      line-color="#7a7a7a"
      line-thickness="2">

      <v-timeline-item
        v-for="evt, index in dayTimeEvents"
        :key="evt.key"
        :dot-color="evt.color"
        :size="getDotSize(evt.key)"
        :class="getItemClass(index)"
        >
        <template v-slot:opposite>
          <span class="text-overline item-key">{{ evt.value }}</span>
        </template>
        <div class="text-body-2 item-text">{{ evt.title }}</div>
      </v-timeline-item>
    </v-timeline>
</template>
<style scoped lang="scss">
.timeline {
  height: 70vh !important;
  grid-row-gap: 20px !important;
}
.item-text {
  /* color: rgb(164, 163, 163); */
  font-size: 12px !important;
  color: #cacaca;
}
.item-key {
  font-size: 14px !important;
  color: #FFF;
}
:deep(.previous .v-timeline-divider__after),
  :deep(.last .v-timeline-divider__before) {
  display: none;
}
:deep(.last) {
  margin-top: 10px;
}
</style>