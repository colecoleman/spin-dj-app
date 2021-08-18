<template>
  <base-card :icon="discsvg">
    <template v-slot:icon> </template>
    <template v-slot:title>Events</template>
    <template v-slot:action1
      >Sort:
      <svg
        width="15.375"
        height="15.375"
        viewBox="0 0 18.375 18.375"
        style="margin-left: 10px"
        @click="toggleSortMenuOpened()"
      >
        <path
          d="M7.219,14.438H5.25V1.969a.656.656,0,0,0-.656-.656H3.281a.656.656,0,0,0-.656.656V14.438H.656a.657.657,0,0,0-.463,1.12L3.474,19.5a.656.656,0,0,0,.928,0l3.281-3.938A.657.657,0,0,0,7.219,14.438Zm9.844-2.625h-5.25a.656.656,0,0,0-.656.656v1.313a.656.656,0,0,0,.656.656h2.3L11.6,17.327a1.313,1.313,0,0,0-.441.981v.723a.656.656,0,0,0,.656.656h5.25a.656.656,0,0,0,.656-.656V17.719a.656.656,0,0,0-.656-.656h-2.3l2.513-2.89a1.312,1.312,0,0,0,.441-.981v-.723A.656.656,0,0,0,17.063,11.813Zm1.274-3.5L15.905,1.748a.656.656,0,0,0-.618-.436h-1.7a.656.656,0,0,0-.618.436L10.539,8.311a.656.656,0,0,0,.618.877h1.018a.656.656,0,0,0,.625-.454l.181-.53h2.912l.181.53a.656.656,0,0,0,.626.454h1.019a.656.656,0,0,0,.618-.877Zm-4.571-2.4.672-1.969.672,1.969Z"
          transform="translate(0 -1.313)"
          fill="currentColor"
        />
      </svg>
      <div id="floating-menu-container">
        <floating-menu-with-list-items
          v-if="sortMenuOpened"
          :actions="sortItems"
          @actionClicked="selectSort"
        /></div
    ></template>
    <template v-slot:content>
      <div id="events-content">
        <location-upcoming-events-list-item
          v-for="event in events"
          :key="event.id"
          :event="event"
          @click="navigateToEventPage(event.id), sortByDateDescending()"
        ></location-upcoming-events-list-item>
      </div>
    </template>
  </base-card>
</template>

<script>
import LocationUpcomingEventsListItem from "./LocationUpcomingEventListItem.vue";
import FloatingMenuWithListItems from "../../../../../SharedComponents/SharedComponentsUI/FloatingMenuWithListItems.vue";
import discsvg from "../../../../../assets/SVGs/disc.svg";
export default {
  data() {
    return {
      discsvg,
      isFetching: this.$store.state.isFetching,
      sortMenuOpened: false,
      sortItems: [
        {
          title: "Date Ascending",
          icon: undefined,
          sortLogic: function (a, b) {
            return a.eventStartTime < b.eventStartTime
              ? -1
              : a.eventStartTime > b.eventStartTime
              ? 1
              : 0;
          },
        },
        {
          title: "Date Descending",
          icon: undefined,
          sortLogic: function (a, b) {
            return a.eventStartTime > b.eventStartTime
              ? -1
              : a.eventStartTime < b.eventStartTime
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
      this.$router.push("/events/" + id);
    },
  },
  computed: {
    events() {
      let today = new Date();
      console.log(this.location.id);
      return this.$store.state.events.filter(
        (event) =>
          event.eventStartTime > today &&
          event.eventLocations.some(
            (location) => location.locationId === this.location.id
          )
      );
    },
  },
  props: ["location"],

  created() {},
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