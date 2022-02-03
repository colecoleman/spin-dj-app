<template>
  <div id="wrapper" v-if="!loading">
    <div id="contact-card">
      <contact-card-person :contact="client" />
    </div>
    <div id="to-do">
      <contact-page-to-do-list :contact="client" />
    </div>

    <div id="upcoming-events">
      <upcoming-events
        v-if="events"
        :events="events"
        :pastEvents="pastEvents"
      ></upcoming-events>
    </div>
    <div id="calendar">
      <event-calendar :events="events"/>
    </div>
    <div id="messages">
      <recent-messages :conversationList="userConversations"/>
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
      // events: [],
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
      console.log(this.$store.state.events);
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
    await this.$store.dispatch("getEvents").then((res) => {
      console.log(res);
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