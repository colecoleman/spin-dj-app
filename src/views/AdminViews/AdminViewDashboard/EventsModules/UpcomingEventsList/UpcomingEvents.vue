<template>
  <base-card
    :icon="discsvg"
    :actionIcon="sortalpha"
    @action-one-clicked="sortMenuOpened = !sortMenuOpened"
    :loading="events ? false : true"
  >
    <template v-slot:title>Events</template>
    <template v-slot:action1
      >Sort:
      <floating-menu-with-list-items
        v-if="sortMenuOpened"
        :actions="sortItems"
        @actionClicked="selectSort"
      />
    </template>
    <template v-slot:content>
      <div class="wrapper" v-if="mutableEvents">
        <div id="events-content" v-if="mutableEvents.length > 0">
          <upcoming-events-list-item
            v-for="event in mutableEvents"
            :key="event.userId"
            :event="event"
            @click="navigateToEventPage(event.userId)"
          ></upcoming-events-list-item>
        </div>
        <h5 v-if="events.length <= 0">No events to display! Add some!</h5>
      </div>
    </template>
  </base-card>
</template>

<script>
import UpcomingEventsListItem from "../../../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEventListItem.vue";
import FloatingMenuWithListItems from "../../../../../SharedComponents/SharedComponentsUI/FloatingMenuWithListItems.vue";
import discsvg from "../../../../../assets/SVGs/disc.svg";
import sortalpha from "../../../../../assets/SVGs/sort-alpha.svg";
export default {
  data() {
    return {
      discsvg,
      sortalpha,
      mutableEvents: undefined,
      isFetching: this.$store.state.isFetching,
      sortMenuOpened: false,
      sortItems: [
        {
          title: "Date Ascending",
          icon: undefined,
          logic: function (a, b) {
            return a.date.startTime < b.date.startTime
              ? -1
              : a.date.startTime > b.date.startTime
              ? 1
              : 0;
          },
        },
        {
          title: "Date Descending",
          icon: undefined,
          logic: function (a, b) {
            return a.date.startTime > b.date.startTime
              ? -1
              : a.date.startTime < b.date.startTime
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
      this.mutableEvents.sort(action);
      this.toggleSortMenuOpened();
    },
    navigateToEventPage(id) {
      this.$router.push("/events/" + id);
    },
  },
  created() {
    this.mutableEvents = this.events;
    console.log(this.mutableEvents);
    console.log(this.events);
    this.selectSort(this.sortItems[0].logic);
  },
  props: ["events"],
  components: { UpcomingEventsListItem, FloatingMenuWithListItems },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#events-content {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  width: 100%;
  height: 100%;
}
#floating-menu-container {
  position: relative;
  width: fit-content;
  height: fit-content;
}
</style>