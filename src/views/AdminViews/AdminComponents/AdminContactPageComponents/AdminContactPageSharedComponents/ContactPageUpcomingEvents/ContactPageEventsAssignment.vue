<template>
  <base-card
    :actionIcon="SVGs.XIconSVG"
    @action-one-clicked="eventAssignmentToggle()"
    title="Assign To Events"
  >
    <template v-slot:action1>Cancel</template>
    <template v-slot:content>
      <div class="events-content">
        <div
          v-for="(event, index) in allEvents"
          :key="index"
          class="upcoming-event-list-item-container"
        >
          <location-upcoming-events-list-item
            @click="initializeAddToEvent(event.userId)"
            :event="event"
          />
          <two-button-dialog-modal
            v-if="addEventId"
            @close-modal="closeConfirmationDialog()"
            @select-button-one="addUserToEvent()"
            @select-button-two="closeConfirmationDialog()"
          />
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import LocationUpcomingEventsListItem from "../../../../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEventListItem.vue";
import TwoButtonDialogModal from "../../../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";
import SVGs from "../../../../../../assets/SVGs/svgIndex.js";
export default {
  data() {
    return {
      SVGs,
      addEventId: undefined,
      loaded: false,
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
  methods: {
    eventAssignmentToggle() {
      this.$emit("eventAssignmentToggle");
    },
    initializeAddToEvent(id) {
      this.addEventId = id;
    },
    closeConfirmationDialog() {
      this.addEventId = undefined;
    },
    async addUserToEvent() {
      let contactPayload = {
        clientId: this.contact.userId,
        variable: "associatedEvents",
        value: this.addEventId,
        operation: "addToList",
      };
      let eventPayload = {
        eventId: this.addEventId,
        operation: "addToList",
        variable: "contacts",
        value: { id: this.contact.userId, role: this.contact.role },
      };
      await this.$store.dispatch("editContact", contactPayload);
      await this.$store.dispatch("editEvent", eventPayload);
      this.closeConfirmationDialog();
    },
  },
  computed: {
    allEvents() {
      let today = new Date().getTime();
      return this.$store.state.events.filter((event) => {
        return new Date(event.data.date).getTime() > today;
      });
    },
  },

  props: ["contact", "events"],
  components: {
    LocationUpcomingEventsListItem,
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

.upcoming-event-list-item-container {
  position: relative;
}
</style>