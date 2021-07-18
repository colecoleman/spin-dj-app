<template>
  <div id="single-day-view-wrapper">
    <h5>{{ displayableDate }}</h5>
    <div id="single-day-scroll-container">
      <single-day-view-item
        v-for="event in events"
        :key="event.id"
        :event="event"
        @click="navigateToEventPage(event.id)"
      />
    </div>
  </div>
</template>

<script>
import SingleDayViewItem from "../SingleDayView/SingleDayViewItem.vue";

export default {
  data() {
    return {};
  },
  methods: {
    navigateToEventPage(id) {
      this.$router.push("/events/" + id);
    },
  },
  computed: {
    displayableDate() {
      return this.date.toLocaleDateString("lookup", {
        weekday: "long",
        month: "long",
        year: "numeric",
        day: "numeric",
      });
    },
    eventsOnDay() {
      console.log(this.events);
      return this.$store.state.events.filter((event) => {
        let eventDate = event.eventStartTime.toLocaleDateString("lookup", {
          day: "numeric",
          year: "numeric",
          month: "2-digit",
        });

        let chosenDate = this.date.toLocaleDateString("lookup", {
          day: "numeric",
          year: "numeric",
          month: "2-digit",
        });

        return eventDate === chosenDate;
      });
    },

  },
  props: ["date", "events"],
  components: { SingleDayViewItem },
};
</script>

<style scoped>
#single-day-view-wrapper {
  height: 100%;
}

#single-day-view-wrapper > h5 {
  height: 10%;
}

#single-day-scroll-container {
  height: 90%;
  overflow: scroll;
}
</style>