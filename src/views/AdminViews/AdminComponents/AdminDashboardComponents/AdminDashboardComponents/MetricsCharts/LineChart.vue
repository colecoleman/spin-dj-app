<template>
  <div id="chart-container">
    <div id="chart"></div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
import {
  total,
  formatPrice,
  balanceOutstanding,
} from "../../../../../../helpers.js";

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
          (x) =>
            new Date(x.data.date).getMonth() === index &&
            new Date(x.data.date).getYear() === new Date().getYear()
        );
        monthEvents.forEach((event) => {
          monthTotal += this.total(event.invoice, event.data);
        });
        totals.push(monthTotal);
      });
      return totals;
    },
    balancesOutstanding() {
      let totals = [];
      this.months.forEach((_, index) => {
        let monthTotal = 0;
        let monthEvents = this.events.filter(
          (x) =>
            new Date(x.data.date).getMonth() === index &&
            new Date(x.data.date).getYear() === new Date().getYear()
        );
        monthEvents.forEach((event) => {
          monthTotal += this.balanceOutstanding(event.invoice, event.data);
        });
        totals.push(monthTotal);
      });
      return totals;
    },
    amountPaid() {
      let totals = [];
      this.months.forEach((_, index) => {
        let monthTotal = 0;
        let monthEvents = this.events.filter(
          (x) =>
            new Date(x.data.date).getMonth() === index &&
            new Date(x.data.date).getYear() === new Date().getYear()
        );
        monthEvents.forEach((event) => {
          monthTotal +=
            this.total(event.invoice, event.data) -
            this.balanceOutstanding(event.invoice, event.data);
        });
        totals.push(monthTotal);
      });
      return totals;
    },
  },
  methods: {
    total,
    formatPrice,
    balanceOutstanding,
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
        colors: [
          this.$root.branding.highlightColor,
          this.$root.branding.textColor,
          this.$root.branding.backgroundColor,
        ],
        stroke: {
          curve: "smooth",
        },
        dataLabels: {
          style: {
            colors: [this.$root.branding.textColor],
            fontFamily: "Roboto, Sans-Serif",
            fontSize: "16px",
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
          {
            name: "Open",
            data: this.balancesOutstanding,
          },
          {
            name: "Paid",
            data: this.amountPaid,
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

@media screen and (min-width: 320px) {
  #chart {
    cursor: pointer;
    min-width: 600px;
    height: 100%;
  }

  #chart-container {
    overflow-x: scroll;
    overflow-y: hidden;
    height: 100%;
  }
}
</style>