<template>
  <div id="wrapper" v-if="!loading">
    <div id="contact-card">
      <contact-card-person :contact="client"></contact-card-person>
    </div>
    <div id="to-do">
      <contact-page-to-do-list :contact="client"></contact-page-to-do-list>
    </div>

    <div id="upcoming-events">
      <upcoming-events
        :events="events"
        :pastEvents="pastEvents"
      ></upcoming-events>
    </div>
    <div id="calendar">
      <event-calendar :events="events"></event-calendar>
    </div>
    <div id="messages">
      <recent-messages :conversationList="userConversations"></recent-messages>
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
    currentUser() {
      return this.$store.state.user;
    },
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
    userConversations() {
      return [...new Set(this.currentUser.conversations)];
    },
  },
  async created() {
    this.loading = true;
    if (!this.$store.state.user) {
      await this.$store.dispatch("setUser");
    }
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
#wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: 30% 1fr 30%;
  gap: 10px;
}

#contact-card {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

#to-do {
  grid-column: 1 / 2;
  grid-row: 3 / 11;
}

#upcoming-events {
  grid-column: 2 /3;
  grid-row: 1 / 11;
}

#calendar {
  grid-column: 3/4;
  grid-row: 1/ 6;
}

#messages {
  grid-column: 3/4;
  grid-row: 6/11;
}
</style>