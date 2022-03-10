<template>
  <base-card
    svg="disc"
    :loading="events && contact ? false : true"
    title="Events"
    actionIcon="sort-alpha"
    actionText="Sort:"
    @action-one-clicked="toggleSortMenuOpened"
  >
    <template v-slot:dropdownContainer>
      <floating-menu-with-list-items
        v-if="sortMenuOpened"
        :actions="sortItems"
        @actionClicked="selectSort"
      />
    </template>
    <template v-slot:content>
      <div id="events-content" v-if="events">
        <location-upcoming-events-list-item
          v-for="event in events"
          :key="event.userId"
          :event="event"
          @click="navigateToEventPage(event.userId)"
        />
      </div>
      <h5 v-if="!events">No events found for this client.</h5>
    </template>
  </base-card>
</template>

<script>
import LocationUpcomingEventsListItem from "./ClientPageUpcomingEventListItem.vue";
import FloatingMenuWithListItems from "../../../../../SharedComponents/SharedComponentsUI/FloatingMenuWithListItems.vue";
export default {
  data() {
    return {
      events: [],
      isFetching: this.$store.state.isFetching,
      sortMenuOpened: false,
      sortItems: [
        {
          title: "Date Ascending",
          icon: undefined,
          logic(a, b) {
            return a.data.startTime < b.data.startTime
              ? -1
              : a.data.startTime > b.data.startTime
              ? 1
              : 0;
          },
        },
        {
          title: "Date Descending",
          icon: undefined,
          logic(a, b) {
            return a.data.startTime > b.data.startTime
              ? -1
              : a.data.startTime < b.data.startTime
              ? 1
              : 0;
          },
        },
      ],
    };
  },
  methods: {
    toggleSortMenuOpened() {
      this.sortMenuOpened = !this.sortMenuOpened;
    },
    selectSort(action) {
      this.events.sort(action);
      this.toggleSortMenuOpened();
    },
    navigateToEventPage(id) {
      this.$router.push("/admin/events/" + id);
    },
  },
  props: ["contact"],
  created() {
    this.contact.associatedEvents.forEach((event) => {
      this.$store.dispatch("adminGetEvent", event).then((res) => {
        console.log(res);
        this.events.push(res.data.Item);
      });
    });
  },
  watch: {
    contact: function () {
      this.events = [];
      this.contact.associatedEvents.forEach((event) => {
        this.$store.dispatch("adminGetEvent", event).then((res) => {
          console.log(res);
          this.events.push(res.data.Item);
        });
      });
    },
  },
  components: { LocationUpcomingEventsListItem, FloatingMenuWithListItems },
};
</script>

<style scoped>
#events-content {
  flex-direction: column;
  overflow: scroll;
  height: 100%;
}
#floating-menu-container {
  position: relative;
  width: fit-content;
  height: fit-content;
}
</style>