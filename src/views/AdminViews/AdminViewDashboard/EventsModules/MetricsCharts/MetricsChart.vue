<template>
  <div id="metrics-chart-container">
    <base-card :icon="metricsChartsvg">
      <template v-slot:title>Metrics</template>
      <template v-slot:content>
        <div id="chart-content"><line-chart></line-chart></div>
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

  components: { LineChart },
};
</script>

<style scoped>
#metrics-chart-container {
  height: 100%;
}

#chart-content {
  width: 100%;
  height: 100%;
}
</style>