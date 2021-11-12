<template>
  <div id="wrapper">
    <apexchart
      width="100%"
      height="100%"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // chartOptions: {
      //   chart: {
      //     id: "vuechart-example",
      //     toolbar: {
      //       show: false,
      //     },
      //   },
      //   colors: [
      //     console.log(this.highlightColor),
      //     this.highlightColor,
      //     `"${this.highlightColor}"`,
      //   ],
      //   stroke: {
      //     curve: "smooth",
      //   },
      //   dataLabels: {
      //     style: {
      //       colors: ["#ffffff"],
      //     },
      //   },
      //   yaxis: {
      //     labels: {
      //       style: {
      //         colors: "#ffffff",
      //         fontWeight: 600,
      //       },
      //     },
      //   },
      //   xaxis: {
      //     categories: [
      //       "Jan",
      //       "Feb",
      //       "Mar",
      //       "Apr",
      //       "May",
      //       "Jun",
      //       "Jul",
      //       "Aug",
      //       "Sep",
      //       "Oct",
      //       "Nov",
      //       "Dec",
      //     ],
      //     labels: {
      //       rotate: 0,
      //       rotateAlways: false,
      //       style: {
      //         colors: "#ffffff",
      //         fontWeight: 600,
      //       },
      //     },
      //   },
      //   markers: {
      //     size: 0.5,
      //   },
      //   tooltip: {
      //     fillSeriesColor: false,
      //     theme: "dark",
      //     x: {
      //       show: false,
      //     },
      //     y: {},
      //   },
      // },
      series: [
        {
          name: "Event Count",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };
  },
  computed: {
    chartOptions() {
      return {
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: false,
          },
        },
        // colors: [this.branding.highlightColor, "#000000"],
        stroke: {
          curve: "smooth",
        },
        dataLabels: {
          style: {
            // colors: [this.branding.textColor],
          },
        },
        yaxis: {
          labels: {
            style: {
              // colors: [this.branding.textColor],
              fontWeight: 600,
            },
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          labels: {
            rotate: 0,
            rotateAlways: false,
            style: {
              // colors: [this.branding.textColor],

              fontWeight: 600,
            },
          },
        },
        markers: {
          size: 0.5,
        },
        tooltip: {
          fillSeriesColor: false,
          theme: "dark",
          x: {
            show: false,
          },
          y: {},
        },
      };
    },
  },
};
</script>

<style scoped>
#wrapper {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>