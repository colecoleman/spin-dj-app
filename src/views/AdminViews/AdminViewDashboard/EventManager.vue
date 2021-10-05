<template>
  <section>
    <div id="navigation">
      <base-navigation-card>
        <template v-slot:navigation>
          <admin-dashboard-navigation></admin-dashboard-navigation>
        </template>
      </base-navigation-card>
    </div>
    <div id="wrapper">
      <div id="left-content-div">
        <div id="box-1" class="box">
          <upcoming-events></upcoming-events>
        </div>
        <div id="box-2" class="box">
          <metrics-chart></metrics-chart>
        </div>
      </div>
      <div id="right-content-div">
        <div id="box-3" class="box">
          <event-calendar></event-calendar>
        </div>
        <div id="box-4" class="box">
          <recent-messages></recent-messages>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UpcomingEvents from "./EventsModules/UpcomingEventsList/UpcomingEvents.vue";
import MetricsChart from "./EventsModules/MetricsCharts/MetricsChart";
import EventCalendar from "../../../SharedComponents/SharedComponentsCalendar/EventCalendar.vue";
import RecentMessages from "../../../SharedComponents/SharedComponentsMessaging/RecentMessages.vue";
import BaseNavigationCard from "../../../SharedComponents/SharedComponentsUI/BaseNavigationCard.vue";
import AdminDashboardNavigation from "./AdminDashboardNavigation.vue";

export default {
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
  width: 100%;
}

#navigation {
  width: 20%;
}
section {
  display: flex;
  width: 100%;
  flex-direction: row;
  /* margin: 20px; */
}

#left-content-div {
  height: 100%;
  /* display: flex; */
  align-content: stretch;
  align-items: stretch;
  flex-flow: column;
  min-width: 65%;
}

#right-content-div {
  height: 100%;
  /* display: flex; */
  align-items: stretch;
  align-content: stretch;
  flex-flow: column;
  width: 35%;
}

#box-1 {
  height: 50%;
}
#box-2 {
  height: 50%;
}

#box-3 {
  height: 50%;
}

#box-4 {
  height: 50%;
}
</style>