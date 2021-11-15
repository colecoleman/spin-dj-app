<template>
  <div id="metrics-chart-container">
    <base-card :icon="metricsChartsvg">
      <template v-slot:title>Metrics</template>
      <template v-slot:content>
        <line-chart :events="events"></line-chart>
      </template>
    </base-card>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";

import metricsChartsvg from "../../../../../assets/SVGs/metricchart.svg";

export default {
  data() {
    return {
      metricsChartsvg,
    };
  },
  props: ["events"],

  components: { LineChart },
};
</script>

<style scoped>
#metrics-chart-container {
  height: 100%;
}
</style>