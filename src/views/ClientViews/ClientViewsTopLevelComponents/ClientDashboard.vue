<template>
  <div id="client-dashboard-wrapper" v-if="!loading">
    <div class="column-one">
      <div id="box-one-wrapper">
        <contact-card-person :contact="client"></contact-card-person>
      </div>
      <div id="box-two-wrapper">
        <contact-page-to-do-list :contact="client"></contact-page-to-do-list>
      </div>
    </div>
    <div class="column-two">
      <upcoming-events :events="events"></upcoming-events>
    </div>
    <div class="column-three">
      <div id="box-four-wrapper">
        <event-calendar :events="events"></event-calendar>
      </div>
      <div id="box-five-wrapper">
        <recent-messages></recent-messages>
      </div>
    </div>
  </div>
</template>
<script>
import RecentMessages from "../../../SharedComponents/SharedComponentsMessaging/RecentMessages.vue";
import ContactPageToDoList from "../../../SharedComponents/SharedComponentsContact/ContactPageToDoList.vue";
import EventCalendar from "../../../SharedComponents/SharedComponentsCalendar/EventCalendar.vue";
import UpcomingEvents from "../../AdminViews/AdminViewDashboard/EventsModules/UpcomingEventsList/UpcomingEvents.vue";
import ContactCardPerson from "../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
export default {
  data() {
    return {
      loading: true,
      client: undefined,
      events: undefined,
    };
  },
  methods: {},
  computed: {},
  async created() {
    this.loading = true;
    await this.$store
      .dispatch("getUser", this.$store.state.user.userId)
      .then((res) => {
        this.client = res;
      });
    await this.$store.dispatch("getEvents").then((res) => {
      this.events = res.data.Items;
      console.log(this.events);
    });
    this.loading = false;
  },
  components: {
    ContactCardPerson,
    UpcomingEvents,
    RecentMessages,
    ContactPageToDoList,
    EventCalendar,
  },
  props: [],
};
</script>
<style scoped>
#client-dashboard-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-evenly;
}

.column-one,
.column-two,
.column-three {
  display: flex;
  flex-direction: column;
}

.column-one {
  width: 25%;
}

#box-two-wrapper {
  flex: 1;
}

.column-two {
  flex: 1;
}

.column-three {
  width: 30%;
}

#box-five-wrapper {
  flex: 1;
}
</style>