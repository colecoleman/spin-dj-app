<template>
  <div id="upcoming-events">
    <upcoming-events :events="events" />
  </div>
  <div id="metrics-chart">
    <metrics-chart :events="events" />
  </div>
  <div id="calendar">
    <event-calendar :events="events" />
  </div>
  <div id="messaging">
    <messaging />
  </div>
</template>
<script>
import UpcomingEvents from "../../../Components/SharedComponentsUpcomingEvents/UpcomingEvents.vue";
import MetricsChart from "../../../Components/AdminComponents/AdminDashboardComponents/AdminDashboardComponents/MetricsCharts/MetricsChart.vue";
import EventCalendar from "../../../Components/SharedComponentsCalendar/EventCalendar.vue";
import Messaging from "../../../Components/SharedComponentsMessaging/Messaging.vue";
export default {
  data() {
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    events() {
      return this.$store.state.events;
    },
  },
  methods: {},
  async created() {
    await this.$store.dispatch("getAdminEvents").then(() => {
      this.$store.commit("sortEvents");
      this.$store.dispatch("getEventsContacts");
      this.$store.dispatch("getEventsLocations");
    });
  },
  components: {
    UpcomingEvents,
    MetricsChart,
    EventCalendar,
    Messaging,
  },
  props: [],
};
</script>
<style scoped>
@media screen and (min-width: 320px) {
  #upcoming-events {
    grid-row: 1 / 2;
  }

  #metrics-chart {
    grid-row: 2 / 3;
  }
  #calendar {
    grid-row: 3/ 4;
  }

  #messaging {
    grid-row: 4/ 5;
  }
}

@media screen and (min-width: 800px) {
  #upcoming-events {
    max-width: 100%;
    grid-column: 1 / 3;
  }

  #metrics-chart {
    grid-column: 1 / 3;
  }
  #calendar {
    grid-column: 1 / 2;
    grid-row: 4/5;
  }

  #messaging {
    grid-column: 2 / 3;
    grid-row: 4/5;
  }
}
@media screen and (min-width: 1000px) {
  #upcoming-events {
    grid-column: 1 / 3;
    grid-row: 1/2;
  }

  #metrics-chart {
    grid-row: 2/3;
    grid-column: 1 / 3;
  }
  #calendar {
    grid-column: 3 / 4;
    grid-row: 1/ 2;
  }

  #messaging {
    display: unset;
    grid-column: 3/ 4;
    grid-row: 2/ 3;
  }
}
</style>