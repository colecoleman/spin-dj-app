<template>
  <div id="wrapper" v-if="!loading">
    <div id="contact-card">
      <contact-card-person :contact="client" />
    </div>
    <div id="to-do">
      <to-do-list listType="contact" :contact="client" />
    </div>

    <div id="upcoming-events">
      <upcoming-events :events="events" :pastEvents="pastEvents" />
    </div>
    <div id="calendar">
      <event-calendar :events="events" />
    </div>
    <div id="messaging">
      <recent-messages :conversationList="userConversations" />
    </div>
  </div>
</template>
<script>
import RecentMessages from "../../../SharedComponents/SharedComponentsMessaging/RecentMessages.vue";
import ToDoList from "../../../SharedComponents/SharedComponentsToDoList/ToDoList.vue";
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
    await this.$store.dispatch("getEvents").then(() => {
      this.$store.commit("sortEvents");
      this.$store.dispatch("getEventsContacts");
      this.$store.dispatch("getEventsLocations");
    });
    this.loading = false;
  },
  components: {
    ContactCardPerson,
    UpcomingEvents,
    RecentMessages,
    ToDoList,
    EventCalendar,
  },
  props: [],
};
</script>
<style scoped>
@media screen {
  #wrapper {
    width: 100%;
    height: 100%;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr;
    grid-template-rows: 130px repeat(3, 360px);
  }

  #contact-card {
    grid-row: 1/2;
  }

  #upcoming-events {
    grid-row: 2/3;
  }

  #calendar {
    grid-row: 3/4;
  }
  #to-do {
    grid-row: 4/5;
    padding-bottom: 60px;
  }

  #messaging {
    display: none;
  }
  @media (min-width: 800px) {
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
      padding: 0;
    }

    #upcoming-events {
      grid-column: 2 /3;
      grid-row: 1 / 11;
    }

    #calendar {
      grid-column: 3/4;
      grid-row: 1/ 6;
    }

    #messaging {
      display: unset;
      grid-column: 3/4;
      grid-row: 6/11;
    }
  }
}
</style>