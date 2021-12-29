<template>
  <div id="chart"></div>
</template>

<script>
import ApexCharts from "apexcharts";
import helpers from "../../../../../../helpers.js";

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
  computed: {
    branding() {
      return this.$root.branding;
    },
    totals() {
      let totals = [];
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
      return totals;
    },
  },
  methods: {
    calculateTotal: helpers.total,
    formatPrice: helpers.formatPrice,
  },
  props: ["events"],
  mounted() {
    if (document.getElementById("chart")) {
      var chart = new ApexCharts(document.getElementById("chart"), {
        chart: {
          id: "adminChart",
          height: "100%",
          toolbar: {
            show: false,
          },
        },
        colors: [this.$root.branding.highlightColor],
        stroke: {
          curve: "smooth",
        },
        dataLabels: {
          style: {
            colors: [this.$root.branding.textColor],
            fontFamily: "Roboto, Sans-Serif",
            fontWeight: 700,
          },
        },
        yaxis: {
          labels: {
            formatter: this.formatPrice,
          },
        },
        series: [
          {
            name: "Sales",
            data: this.totals,
          },
        ],
        xaxis: {
          categories: this.months,
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
      });
      chart.render();
    }
  },
  watch: {
    events() {
      ApexCharts.exec("adminChart", "updateSeries", [
        {
          data: this.totals,
        },
      ]);
    },
  },
};
</script>

<style scoped>
#chart {
  cursor: pointer;
}
</style>