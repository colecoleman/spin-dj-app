<template>
  <base-card
    svg="disc"
    :actionIcon="eventAssignmentOpen ? 'x-icon' : 'sort-alpha'"
    :actionText="eventAssignmentOpen ? 'Cancel' : 'Sort'"
    :title="title"
    @action-one-clicked="
      eventAssignmentOpen ? eventAssignmentToggle() : toggleSortMenuOpened()
    "
  >
    <template v-slot:dropdownContainer>
      <floating-menu-with-list-items
        v-if="sortMenuOpened"
        :actions="sortItems"
        @actionClicked="selectSort"
      />
    </template>
    <template v-slot:content v-if="events">
      <div class="events-content" v-if="!eventAssignmentOpen && location">
        <h5 @click="eventAssignmentToggle()" v-if="events.length == 0">
          {{ location.name }} has no events.
          <br />
          Click to assign to one.
        </h5>
        <div v-if="events.length > 0">
          <location-upcoming-events-list-item
            v-for="event in events"
            :key="event.id"
            :event="event"
            @click="navigateToEventPage(event.userId), sortByDateDescending()"
          />
        </div>
      </div>
      <div class="events-content" v-if="eventAssignmentOpen">
        <div
          v-for="(event, index) in allEvents"
          :key="index"
          class="upcoming-event-list-item-container"
        >
          <location-upcoming-events-list-item
            @click="initializeAddToEvent(event)"
            :event="event"
          />
          <two-button-dialog-modal
            v-if="addEventKey"
            @close-modal="closeConfirmationDialog()"
            @select-button-one="addLocationToEvent()"
            @select-button-two="closeConfirmationDialog()"
          />
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import LocationUpcomingEventsListItem from "./LocationUpcomingEventListItem.vue";
import FloatingMenuWithListItems from "../../../../../SharedComponents/SharedComponentsUI/FloatingMenuWithListItems.vue";
import TwoButtonDialogModal from "../../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";

export default {
  data() {
    return {
      sortMenuOpened: false,
      addEventKey: undefined,
      sortItems: [
        {
          title: "Date Ascending",
          icon: undefined,
          logic: function (a, b) {
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
          logic: function (a, b) {
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
      this.$store.commit("sortEvents", action);
      this.toggleSortMenuOpened();
    },
    navigateToEventPage(id) {
      this.$router.push("/admin/events/" + id);
    },
    eventAssignmentToggle() {
      this.$emit("eventAssignmentToggle");
    },
    initializeAddToEvent(event) {
      this.addEventKey = { userId: event.userId, tenantId: event.tenantId };
    },
    closeConfirmationDialog() {
      this.addEventKey = undefined;
    },
    async addLocationToEvent() {
      let locationPayload = {
        locationId: this.location.userId,
        operation: "addToList",
        variable: "associatedEvents",
        value: {
          key: this.addEventKey,
        },
      };
      let eventPayload = {
        eventId: this.addEventKey.userId,
        operation: "addToList",
        variable: "locations",
        value: {
          key: {
            userId: this.location.userId,
            tenantId: this.location.tenantId,
          },
        },
      };
      await this.$store.dispatch("editLocation", locationPayload);
      await this.$store.dispatch("editEvent", eventPayload);
      this.closeConfirmationDialog();
    },
  },
  computed: {
    title() {
      return this.eventAssignmentOpen ? "Assign To Events" : "Events";
    },
    allEvents() {
      let today = new Date().getTime();
      return this.$store.state.events.filter((event) => {
        return new Date(event.data.date).getTime() > today;
      });
    },
  },
  created() {},
  props: ["location", "events", "eventAssignmentOpen"],
  components: {
    LocationUpcomingEventsListItem,
    FloatingMenuWithListItems,
    TwoButtonDialogModal,
  },
};
</script>

<style scoped>
.events-content {
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