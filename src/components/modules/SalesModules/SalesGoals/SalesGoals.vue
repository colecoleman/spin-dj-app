<template>
  <section id="sales-goals-wrapper">
    <div id="heading-div">
      <div id="leftmost-heading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="22.356"
          viewBox="0 0 22 22.356"
        >
          <path
            id="Icon_awesome-flag-checkered"
            data-name="Icon awesome-flag-checkered"
            d="M10.831,8.29v2.973c1.14.258,2.152.681,3.213.974V9.259c-1.135-.253-2.157-.677-3.213-.969ZM20.58,2.92a12.749,12.749,0,0,1-5.108,1.393c-2.336,0-4.27-1.519-7.213-1.519a8.489,8.489,0,0,0-2.969.524A2.445,2.445,0,1,0,1.61,4.448V21.3a1.045,1.045,0,0,0,1.048,1.048h.7A1.045,1.045,0,0,0,4.4,21.3V17.183A12.173,12.173,0,0,1,9.4,16.218c2.34,0,4.27,1.519,7.213,1.519a9.123,9.123,0,0,0,5.348-1.786,1.393,1.393,0,0,0,.6-1.153V4.186A1.4,1.4,0,0,0,20.58,2.92ZM7.618,14.21a13.755,13.755,0,0,0-3.213.725V11.857a12.49,12.49,0,0,1,3.213-.76ZM20.471,8.338a13.927,13.927,0,0,1-3.213,1.043v3.1a8.115,8.115,0,0,0,3.213-1.135v3.078a7.055,7.055,0,0,1-3.213,1.183V12.485a7.385,7.385,0,0,1-3.213-.244v2.943a25.473,25.473,0,0,0-3.213-.93V11.263A9.7,9.7,0,0,0,7.618,11.1V8.041A15.407,15.407,0,0,0,4.4,8.953V5.875a12.5,12.5,0,0,1,3.213-.961V8.041a7.426,7.426,0,0,1,3.213.249V5.347a24.855,24.855,0,0,0,3.213.93V9.263a8.317,8.317,0,0,0,3.213.118V6.242a15.448,15.448,0,0,0,3.213-.982Z"
            transform="translate(-0.563 0.003)"
            fill="#fff"
          />
        </svg>
        <h4>Goals</h4>
      </div>
      <div id="rightmost-heading">
        <h5>Month</h5>
        <h5>Quarter</h5>
        <h5>Year</h5>
      </div>
    </div>
    <div id="main-body">
      <div id="chart-container">
        <apexchart
          type="donut"
          height="100%"
          :options="pieChartOptions.options"
          :series="pieChartOptions.series"
        ></apexchart>
      </div>
      <div id="data-label-containers">
        <h4>Won: ${{ dummyData.won.toLocaleString() }}</h4>
        <h4>Proposal Sent: ${{ dummyData.proposalSent.toLocaleString() }}</h4>
        <h4>Open: ${{ dummyData.open.toLocaleString() }}</h4>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {},
  data() {
    return {
      dummyData: {
        won: 6000,
        proposalSent: 3000,
        open: 1000,
      },
      pieChartOptions: {
        series: [6000, 3000, 1000],
        options: {
          legend: {
            show: false,
          },
          colors: ["#00f5ff", "#808080", "#ffffff", "#000000"],
          dataLabels: {
            enabled: false,
          },
          labels: ["Won", "Proposal Sent", "Open"],
          chartOptions: {
            chart: {
              id: "pie-chart",
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {},
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
          plotOptions: {
            pie: {
              donut: {
                size: "75%",
                labels: {
                  show: true,
                  name: {
                    show: true,
                  },
                  value: {
                    show: true,
                    fontSize: "22px",
                    fontFamily: "Montserrat, Helvetica, Sans-serif",
                    fontWeight: 600,
                    color: "#FFFFFF",
                  },
                  total: {
                    show: true,
                    showAlways: true,
                    label: "Total:",
                    fontSize: "22px",
                    fontFamily: "Montserrat, Helvetica, Sans-Serif",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    formatter: function (w) {
                      const total = w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      });
                      return "$" + total.toLocaleString();
                    },
                  },
                },
                value: {
                  show: true,
                },
              },
            },
          },
        },
      },
    };
  },
};
</script>

<style scoped>
#sales-goals-wrapper {
  width: 42vw;
  height: 35vh;
}

#chart-container {
  flex: 1;
  height: 100%;
  margin: auto;
}

#heading-div {
  display: flex;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
}

#leftmost-heading {
  flex: 1;
  display: flex;
  width: 50%;
  justify-content: left;
  align-items: center;
}

#leftmost-heading svg {
  margin: 5px;
}

#rightmost-heading {
  flex: 3;
  margin-right: 40px;
  margin-left: 40px;
  display: flex;
  align-content: space-evenly;
}

#rightmost-heading h5 {
  flex: 1;
  margin: 10px;
  text-transform: uppercase;
}

#main-body {
  height: 85%;
  width: 100%;
  display: flex;
  flex-direction: row;
}

#data-label-containers {
  flex: 1;
  align-content: center;
  justify-content: left;
  margin: auto;
  padding-right: 10%;
}

#data-label-containers h4 {
  text-align: right;
  width: 100%;
  margin: 10px;
}
</style>
