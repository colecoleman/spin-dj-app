<template>
  <base-card title="Events" svg="calendar" class="events-list-wrapper">
    <template v-slot:content>
      <div id="playlist-events-scroll-wrapper">
        <event-item
          v-for="(event, index) in events"
          :key="index"
          :event="event"
          @event-clicked="eventClicked"
        />
      </div>
    </template>
  </base-card>
</template>
<script>
import EventItem from "./AdminDashboardLibraryEventItem.vue";
export default {
  data() {
    return {};
  },
  computed: {
    events() {
      this.$store.commit("sortEvents");
      return this.$store.getters.events;
    },
  },
  methods: {
    eventClicked(event) {
      this.$emit("event-clicked", event);
    },
  },
  components: { EventItem },
  emits: ["event-clicked"],
  props: ["active-event"],
};
</script>
<style scoped>
.events-list-wrapper {
  padding-bottom: 40px;
}
#playlist-events-scroll-wrapper {
  height: 100%;
  width: 100%;
  overflow: scroll;
}
</style>