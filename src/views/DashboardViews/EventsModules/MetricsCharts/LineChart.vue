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
      chartOptions: {
        chart: {
          id: "vuechart-example",
          toolbar: {
            show: false,
          },
        },
        colors: ["#00f5ff", "#ffffff"],
        stroke: {
          curve: "smooth",
        },
        dataLabels: {
          style: {
            colors: ["#ffffff"],
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#ffffff",
              fontFamily: "montserrat, arial, sans-serif",
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
              colors: "#ffffff",
              fontFamily: "montserrat, arial, sans-serif",
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
      },
      series: [
        {
          name: "Event Count",
          data: [30, 40, 35, 50, 49, 60, 70, 12, 34, 67, 89, 12],
        },
      ],
    };
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