<template>
  <div id="events-content">
    <upcoming-events-list-item
      v-for="event in events"
      :key="event.id"
      :payments="event.eventInvoice.payments"
      :total="event.eventInvoice.total"
      :venueName="event.eventLocations[0].venueName"
      :address1="event.eventLocations[0].address1"
      :address2="event.eventLocations[0].address2"
      :eventDate="event.eventDate"
      :eventStartTime="event.eventStartTime"
      :eventEndTime="event.eventEndTime"
      :balanceOutstanding="event.eventInvoice.balanceOutstanding"
      :firstName="event.firstName"
      :lastName="event.lastName"
      @click="navigateToEventPage(event.id), sortByDateDescending()"
    ></upcoming-events-list-item>
  </div>
</template>

<script>
"../../UI/BaseCard.vue";
import UpcomingEventsListItem from "../UpcomingEventsList/UpcomingEventListItem.vue";

export default {
  data() {
    return {
      isFetching: this.$store.state.isFetching,
    };
  },
  methods: {
    fetchData() {
      // this.$store.dispatch("getClients");
      // this.$store.dispatch("getEvents");
    },
    combineData() {
      // this.$store.dispatch("getCombined");
    },
    sortByDateDescending() {
      this.events.sort((a, b) => {
        let dateA = new Date(a.eventDate);
        let dateB = new Date(b.eventDate);
        return dateA - dateB;
      });
      // console.log(blah);
    },
    navigateToEventPage(id) {
      // this.$router.push("/event/" + id);
      console.log(id);
    },
  },
  computed: {
    events() {
      return this.$store.state.events;
    },
  },

  created() {
    this.loading = true;
    this.fetchData;
  },

  mounted() {
    // this.combineData;
    console.log(this.events);
  },
  components: { UpcomingEventsListItem },
};
</script>

<style scoped>
#events-content {
  /* display: flex; */
  flex-direction: column;
  overflow: scroll;
  height: 100%;
}
</style>