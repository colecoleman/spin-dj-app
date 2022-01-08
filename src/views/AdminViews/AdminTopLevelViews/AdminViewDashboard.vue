<template>
  <section>
    <div id="navigation">
      <base-card>
        <template v-slot:content>
          <admin-dashboard-navigation></admin-dashboard-navigation>
        </template>
      </base-card>
    </div>
    <div id="upcoming-events">
      <upcoming-events :events="events"></upcoming-events>
    </div>
    <div id="metrics-chart">
      <metrics-chart :events="events"></metrics-chart>
    </div>
    <div id="calendar">
      <event-calendar :events="events"></event-calendar>
    </div>
    <div id="messaging">
      <recent-messages :conversationList="userConversations"></recent-messages>
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
section {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 20% 50% 30%;
  grid-template-rows: 50% 50%;
}

#navigation {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}
#upcoming-events {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

#metrics-chart {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}
#calendar {
  grid-column: 3 / 4;
  grid-row: 1/ 2;
}

#messaging {
  grid-column: 3/ 4;
  grid-row: 2/ 3;
}
</style>