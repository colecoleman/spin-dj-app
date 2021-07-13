<template>
  <div id="events-content">
    <upcoming-events-list-item
      v-for="event in events"
      :key="event.id"
      :event="event"
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
        return dateA - dateB;
      });
      // console.log(blah);
    },
    navigateToEventPage(id) {
      this.$router.push("/events/" + id);
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
  components: { UpcomingEventsListItem },
};
</script>

<style scoped>
#events-content {
  flex-direction: column;
  overflow: scroll;
  height: 100%;
}
</style>