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
          <base-card>
            <template v-slot:icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="19.47"
                viewBox="0 0 21 19.47"
              >
                <path
                  id="Icon_material-show-chart"
                  data-name="Icon material-show-chart"
                  d="M4.575,27.735l6.3-9.015,4.2,6L24,10.38,22.519,8.265,15.075,20.22l-4.2-6L3,25.485Z"
                  transform="translate(-3 -8.265)"
                  fill="#fff"
                />
              </svg>
            </template>
            <template v-slot:title>Metrics</template>
            <template v-slot:content>
              <metrics-chart></metrics-chart>
            </template>
          </base-card>
        </div>
      </div>
      <div id="right-content-div">
        <div id="box-3" class="box">
          <base-card>
            <template v-slot:icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="18.667"
                viewBox="0 0 17 18.667"
              >
                <g
                  id="Group_517"
                  data-name="Group 517"
                  transform="translate(-519 -266)"
                >
                  <path
                    id="Path_5"
                    data-name="Path 5"
                    d="M6.167,6H17.833A1.643,1.643,0,0,1,19.5,7.619v11.33a1.643,1.643,0,0,1-1.667,1.619H6.167A1.643,1.643,0,0,1,4.5,18.948V7.619A1.643,1.643,0,0,1,6.167,6Z"
                    transform="translate(515.5 263.1)"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                  <path
                    id="Path_6"
                    data-name="Path 6"
                    d="M24,3V7.2"
                    transform="translate(506.833 264)"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                  <path
                    id="Path_7"
                    data-name="Path 7"
                    d="M12,3V7.2"
                    transform="translate(512.167 264)"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                  <path
                    id="Path_8"
                    data-name="Path 8"
                    d="M4.5,15h15"
                    transform="translate(515.5 261.167)"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </g>
              </svg>
            </template>
            <template v-slot:title>Calendar</template>
            <template v-slot:content>
              <event-calendar></event-calendar>
            </template>
          </base-card>
        </div>
        <div id="box-4" class="box">
          <base-card>
            <template v-slot:icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="14.993"
                viewBox="0 0 16 14.993"
              >
                <path
                  id="Icon_metro-bubble"
                  data-name="Icon metro-bubble"
                  d="M10.571,3.856c4.418,0,8,2.91,8,6.5s-3.582,6.5-8,6.5a9.881,9.881,0,0,1-1.247-.079,7.791,7.791,0,0,1-5.753,2.072v-.421a3.183,3.183,0,0,0,2-2.572,3.018,3.018,0,0,0-.034-.448,6.119,6.119,0,0,1-2.966-5.052c0-3.59,3.582-6.5,8-6.5Z"
                  transform="translate(-2.571 -3.856)"
                  fill="#fff"
                />
              </svg>
            </template>
            <template v-slot:title>Messages</template>
            <template v-slot:content>
              <recent-messages></recent-messages>
            </template>
          </base-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UpcomingEvents from "../components/modules/EventsModules/UpcomingEventsList/UpcomingEvents.vue";
import MetricsChart from "../components/modules/EventsModules/MetricsCharts/MetricsChart";
import EventCalendar from "../components/Calendar/EventCalendar.vue";
import RecentMessages from "../components/Messaging/RecentMessages.vue";
import BaseCard from "../components/UI/BaseCard.vue";
import BaseNavigationCard from "../components/UI/BaseNavigationCard.vue";
import ManagerNavigation from "../navigationItems/ManagerNavigation.vue";

export default {
  components: {
    UpcomingEvents,
    EventCalendar,
    RecentMessages,
    MetricsChart,
    BaseCard,
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