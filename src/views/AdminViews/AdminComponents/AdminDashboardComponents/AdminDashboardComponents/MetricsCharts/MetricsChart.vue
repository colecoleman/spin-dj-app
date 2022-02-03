<template>
  <div id="metrics-chart-container">
    <base-card :icon="SVGs.MetricChartSVG" :loading="events ? false : true">
      <template v-slot:title>Metrics</template>
      <template v-slot:content>
        <line-chart :events="events" v-if="events" />
      </template>
    </base-card>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import SVGs from "../../../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
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