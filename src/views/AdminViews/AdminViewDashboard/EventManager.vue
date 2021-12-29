<template>
  <section id="dashboard-wrapper">
    <base-navigation-card>
      <template v-slot:navigation>
        <admin-dashboard-navigation></admin-dashboard-navigation>
      </template>
    </base-navigation-card>

    <div id="wrapper">
      <div id="left-content-div">
        <div id="box-1" class="box">
          <upcoming-events :events="events" v-if="events"></upcoming-events>
        </div>
        <div id="box-2" class="box">
          <metrics-chart :events="events"></metrics-chart>
        </div>
      </div>
      <div id="right-content-div">
        <div id="box-3" class="box">
          <event-calendar :events="events" v-if="events"></event-calendar>
        </div>
        <div id="box-4" class="box">
          <recent-messages
            :conversationList="userConversations"
          ></recent-messages>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UpcomingEvents from "../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEvents.vue";
import MetricsChart from "./EventsModules/MetricsCharts/MetricsChart";
import EventCalendar from "../../../SharedComponents/SharedComponentsCalendar/EventCalendar.vue";
import RecentMessages from "../../../SharedComponents/SharedComponentsMessaging/RecentMessages.vue";
import BaseNavigationCard from "../../../SharedComponents/SharedComponentsUI/BaseNavigationCard.vue";
import AdminDashboardNavigation from "./AdminDashboardNavigation.vue";

export default {
  data() {
    return {
      // events: [],
    };
  },
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
    BaseNavigationCard,
    AdminDashboardNavigation,
  },
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
}
#dashboard-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
}

#left-content-div {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 65%;
}

#right-content-div {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 35%;
}

#box-1,
#box-2,
#box-3,
#box-4 {
  height: 50%;
}
</style>