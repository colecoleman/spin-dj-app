<template>
  <section>
    <div id="navigation">
      <base-navigation-card>
        <template v-slot:navigation>
          <manager-navigation></manager-navigation>
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
import EventCalendar from "../../components/Calendar/EventCalendar.vue";
import RecentMessages from "../../components/Messaging/RecentMessages.vue";
import BaseNavigationCard from "../../components/UI/BaseNavigationCard.vue";
import ManagerNavigation from "../../navigationItems/ManagerNavigation.vue";

export default {
  components: {
    UpcomingEvents,
    EventCalendar,
    RecentMessages,
    MetricsChart,
    BaseNavigationCard,
    ManagerNavigation,
  },
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: row;
  width: 80%;
}

#navigation {
  width: 20%;
}
section {
  height: inherit;
  width: inherit;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
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