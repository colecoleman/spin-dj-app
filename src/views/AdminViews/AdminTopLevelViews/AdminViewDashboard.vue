<template>
  <section>
    <div id="navigation">
      <base-card>
        <template v-slot:content>
          <admin-dashboard-navigation />
        </template>
      </base-card>
    </div>
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
      <recent-messages :conversationList="userConversations" />
    </div>
  </section>
</template>

<script>
import UpcomingEvents from "../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEvents.vue";
import MetricsChart from "../AdminComponents/AdminDashboardComponents/AdminDashboardComponents/MetricsCharts/MetricsChart.vue";
import EventCalendar from "../../../SharedComponents/SharedComponentsCalendar/EventCalendar.vue";
import RecentMessages from "../../../SharedComponents/SharedComponentsMessaging/RecentMessages.vue";

import AdminDashboardNavigation from "../AdminComponents/AdminDashboardComponents/AdminDashboardNavigation.vue";

export default {
  computed: {
    currentUser() {
      return this.$store.state.user;
    },

    events() {
      return this.$store.state.events;
    },
    userConversations() {
      return [...new Set(this.currentUser.conversations)];
    },
  },
  components: {
    UpcomingEvents,
    EventCalendar,
    RecentMessages,
    MetricsChart,
    AdminDashboardNavigation,
  },
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  section {
    width: 100%;
    /* height: 100%; */
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(3, 360px);
    gap: 10px;
    padding-bottom: 70px;
  }

  #navigation {
    display: none;
  }
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
    display: none;
    /* grid-row: 4/ 5; */
  }
}

@media screen and (min-width: 411px) {
  #calendar {
    grid-row: 3/ 4;
    padding-bottom: 20px;
  }
}
@media screen and (min-width: 800px) {
  section {
    padding: 0;
    grid-template-columns: minmax(0, 1fr) 350px;
    grid-template-rows: minmax(0, 1fr) 350px;
    margin-bottom: 10px;
  }
  #upcoming-events {
    max-width: 100%;
    grid-column: 1 / 3;
    grid-row: 1/2;
  }

  #metrics-chart {
    grid-column: 1 / 2;
  }
  #calendar {
    grid-column: 2 / 3;
    padding-bottom: 0px;
    grid-row: 2/ 3;
  }

  #messaging {
    /* display: unset; */
    grid-column: 2/ 3;
    grid-row: 1/ 2;
  }
}
@media screen and (min-width: 1000px) {
  section {
    height: 100%;
    grid-template-columns: 200px minmax(0, 1fr) 350px;
  }

  #navigation {
    display: block;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
  #upcoming-events {
    grid-column: 2 / 3;
  }

  #metrics-chart {
    grid-column: 2 / 3;
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
@media screen and (min-width: 1200px) {
  section {
    grid-template-columns: 20% minmax(0, 1fr) 30%;
    grid-template-rows: 50% 1fr;
  }
}
</style>
