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
import BaseCard from "../../../../components/UI/BaseCard.vue";
import metricsChartsvg from "../../../../assets/SVGs/metricchart.svg";

export default {
  data() {
    return {
      metricsChartsvg,
    };
  },
  components: { LineChart, BaseCard },
};
</script>

<style scoped>
#metrics-chart-container {
  height: 100%;
}
#div-heading {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

#leftmost-heading {
  flex: 1;
  display: flex;
  justify-content: left;
  align-items: center;
}

#leftmost-heading svg {
  padding: 5px;
}

#rightmost-heading {
  display: flex;
  text-align: right;
  justify-content: right;
  align-items: center;
}

h4 span {
  font-weight: 200;
}

#rightmost-heading svg {
  transform: rotate(45deg);
  margin: 5px;
}

#chart-content {
  width: 100%;
  height: 100%;
}
</style>