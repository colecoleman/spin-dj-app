<template>
  <div id="chart"></div>
</template>

<script>
import ApexCharts from "apexcharts";
import helpers from "../../../../../helpers.js";
export default {
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  methods: {
    calculateTotal: helpers.total,
    formatPrice: helpers.formatPrice,
  },
  computed: {
    branding() {
      return this.$store.state.branding.branding;
    },
    chartOptions() {
      let totals = [];
      let months = this.months;
      let formatPrice = this.formatPrice;
      this.months.forEach((_, index) => {
        let monthTotal = 0;
        let monthEvents = this.events.filter(
          (x) => new Date(x.data.date).getMonth() === index
        );
        monthEvents.forEach((event) => {
          monthTotal += this.calculateTotal(event.invoice, event.data);
        });
        totals.push(monthTotal);
      });

      let chart = {
        chart: {
          height: "100%",
          toolbar: {
            show: false,
          },
        },
        colors: [this.$store.state.branding.branding.highlightColor],
        stroke: {
          curve: "smooth",
        },
        dataLabels: {
          style: {
            colors: [this.$store.state.branding.branding.textColor],
            fontFamily: "Roboto, Sans-Serif",
            fontWeight: 700,
          },
        },
        yaxis: {
          labels: {
            formatter: formatPrice,
          },
        },
        series: [
          {
            name: "Sales",
            data: totals,
          },
        ],
        xaxis: {
          categories: months,
          labels: {
            formatter: function (value) {
              if (value) {
                return value.substring(0, 3);
              }
            },
          },
          tooltip: {
            enabled: false,
          },
        },
      };
      return chart;
    },
  },
  props: ["events"],
  mounted() {
    if (document.querySelector("#chart")) {
      var chart = new ApexCharts(
        document.querySelector("#chart"),
        this.chartOptions
      );
      chart.render();
    }
  },
};
</script>

<style scoped>
#chart {
  cursor: pointer;
}
</style>