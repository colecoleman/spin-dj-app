<template>
  <section>
    <!-- <div id="client-dashboard-wrapper" v-if="!loading">
      <div class="column-one"> -->
    <div id="contact-card">
      <contact-card-person :contact="client" />
    </div>
    <div id="to-do">
      <contact-page-to-do-list :contact="client" />
    </div>
    <!-- </div> -->
    <div id="upcoming-events">
      <upcoming-events
        :events="events"
        :pastEvents="pastEvents"
      ></upcoming-events>
    </div>
    <!-- <div class="column-three"> -->
    <div id="calendar">
      <event-calendar :events="events"/>
    </div>
    <div id="messaging">
      <recent-messages :conversationList="userConversations"/>
    </div>
    <!-- </div> -->
    <!-- </div> -->
  </section>
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
section {
  width: 100%;
  height: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: 25% 1fr 30%;
  grid-template-rows: 130px 200px 1fr;
}

#contact-card {
  grid-row: 1/2;
  grid-column: 1/2;
}

#to-do {
  grid-row: 2/4;
  grid-column: 1/2;
}

#upcoming-events {
  grid-column: 2/3;
  grid-row: 1/4;
}

#calendar {
  grid-row: 1/3;
  grid-column: 3/4;
}

#messaging {
  grid-row: 3/4;
  grid-column: 3/4;
}
</style>