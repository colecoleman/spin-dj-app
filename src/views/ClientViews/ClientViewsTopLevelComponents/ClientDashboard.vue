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
      <upcoming-events
        :events="events"
        :pastEvents="pastEvents"
      ></upcoming-events>
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
import UpcomingEvents from "../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEvents.vue";
import ContactCardPerson from "../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
export default {
  data() {
    return {
      loading: true,
    };
  },
  methods: {},
  computed: {
    client() {
      return this.$store.state.user;
    },
    events() {
      return this.$store.state.events;
    },
    pastEvents() {
      return this.$store.state.events.filter((x) => {
        let date = new Date().getTime();
        let eventDate = new Date(x.data.endTime).getTime();
        return eventDate < date;
      });
    },
  },
  async created() {
    this.loading = true;
    await this.$store.dispatch(
      "nonAdminGetUser",
      this.$store.state.user.userId
    );

    await this.$store.dispatch("getEvents");
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