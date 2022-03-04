<template>
  <div id="metrics-chart-container">
    <base-card svg="metric-chart" :loading="events ? false : true">
      <template v-slot:title>Metrics</template>
      <template v-slot:content>
        <line-chart :events="events" v-if="events" />
      </template>
    </base-card>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";

export default {
  props: ["events"],

  components: { LineChart },
};
</script>

<style scoped>
#metrics-chart-container {
  height: 100%;
}
</style>