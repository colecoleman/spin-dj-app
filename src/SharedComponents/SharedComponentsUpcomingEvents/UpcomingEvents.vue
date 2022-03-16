<template>
  <base-card
    svg="disc"
    actionIcon="sort-alpha"
    actionText="Sort:"
    @action-one-clicked="sortMenuOpened = !sortMenuOpened"
    :title="`Events (${events.length})`"
  >
    <template v-slot:dropdownContainer>
      <floating-menu-with-list-items
        v-if="sortMenuOpened"
        :actions="sortItems"
        @actionClicked="selectSort"
      />
    </template>
    <template v-slot:content>
      <div class="wrapper">
        <div
          class="events-content"
          v-if="
            (userRole === 'admin' ||
              userRole === 'vendor' ||
              userRole === 'employee' ||
              userRole === 'organizer') &&
            events.length > 0
          "
        >
          <upcoming-events-list-item
            v-for="event in events"
            :key="event.userId"
            :event="event"
            :loaded="loaded"
            @clicked="navigateToEventPage(event.userId)"
          />

          <upcoming-events-list-item
            v-for="event in pastEventsCopy"
            :key="event.userId"
            :event="event"
            :loaded="loaded"
            @clicked="navigateToEventPage(event.userId)"
            class="past-event"
          />
        </div>
        <div
          class="events-content"
          v-if="userRole === 'client' && sortedEvents.length > 0"
        >
          <client-view-upcoming-event-list-item
            v-for="event in sortedEvents"
            :key="event.userId"
            :event="event"
            @click="navigateToEventPage(event.userId)"
          />
          <client-view-upcoming-event-list-item
            v-for="event in pastEventsCopy"
            :key="event.userId"
            :event="event"
            @click="navigateToEventPage(event.userId)"
            class="past-event"
          />
        </div>
        <h5 v-if="events.length <= 0 && pastEventsCopy.length <= 0 && loaded">
          No events to display! Add some!
        </h5>
      </div>
    </template>
  </base-card>
</template>

<script>
import UpcomingEventsListItem from "./UpcomingEventListItem.vue";
// import SkeletonCard from "../SharedComponentsUI/SkeletonCards/SkeletonThreeSectionUpcomingEventListItem.vue";
import FloatingMenuWithListItems from "../SharedComponentsUI/FloatingMenuWithListItems.vue";
import ClientViewUpcomingEventListItem from "./ClientViewUpcomingEventListItem.vue";

export default {
  data() {
    return {
      mutableEvents: undefined,
      pastEventsCopy: [],
      sortMenuOpened: false,
      sortItems: [
        {
          title: "Date Ascending",
          icon: undefined,
          logic: function (a, b) {
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
          logic: function (a, b) {
            return new Date(a.data.startTime).getTime() >
              new Date(b.data.startTime).getTime()
              ? -1
              : new Date(a.data.startTime).getTime() <
                new Date(b.data.startTime).getTime()
              ? 1
              : 0;
          },
        },
      ],
      selectedSortLogic: function (a, b) {
        return new Date(a.data.startTime).getTime() <
          new Date(b.data.startTime).getTime()
          ? -1
          : new Date(a.data.startTime).getTime() >
            new Date(b.data.startTime).getTime()
          ? 1
          : 0;
      },
    };
  },
  computed: {
    skeletonQuantity() {
      if (this.loaded) {
        return 0;
      } else if (this.events.length >= 5) {
        return 0;
      } else {
        return 5 - this.events.length;
      }
    },
    sortedEvents() {
      let temp = this.events;
      return temp.sort(this.selectedSortLogic).filter((x) => {
        let date = new Date().getTime();
        let eventDate = new Date(x.data.endTime).getTime();
        return eventDate > date;
      });
    },
    userRole() {
      let user = this.$store.state.user;
      console.log(user);
      if (user.tenantId === user.userId) {
        return "admin";
      } else {
        return user.role;
      }
    },
  },
  created() {
    if (this.pastEvents) {
      this.pastEventsCopy = [...this.pastEvents];
    }
  },
  methods: {
    toggleSortMenuOpened() {
      this.sortMenuOpened = !this.sortMenuOpened;
    },
    selectSort(action) {
      this.$store.commit("sortEvents", action);
      this.selectedSortLogic = action;
      this.toggleSortMenuOpened();
    },
    navigateToEventPage(id) {
      let user = this.$store.state.user;
      if (user.tenantId === user.userId) {
        this.$router.push(`/admin/events/` + id);
      } else {
        this.$router.push(`/${this.$store.state.user.role}/events/` + id);
      }
    },
  },
  emits: [""],
  props: ["events", "pastEvents", "loaded"],
  components: {
    UpcomingEventsListItem,
    // SkeletonCard,
    FloatingMenuWithListItems,
    ClientViewUpcomingEventListItem,
  },
};
</script>

<style scoped>
.wrapper {
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.events-content {
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

.past-event {
  opacity: 0.5;
}
</style>