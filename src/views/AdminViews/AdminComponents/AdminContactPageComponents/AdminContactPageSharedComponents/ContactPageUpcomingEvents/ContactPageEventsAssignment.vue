<template>
  <base-card
    actionIcon="x-icon"
    @action-one-clicked="eventAssignmentToggle()"
    actionText="Cancel"
    title="Assign To Events"
  >
    <template v-slot:content>
      <div class="events-content">
        <two-button-dialog-modal
          v-if="addEventKey"
          @close-modal="closeConfirmationDialog()"
          @select-button-one="addUserToEvent()"
          @select-button-two="closeConfirmationDialog()"
        />
        <div
          v-for="(event, index) in allEvents"
          :key="index"
          class="upcoming-event-list-item-container"
        >
          <location-upcoming-events-list-item
            @click="initializeAddToEvent(event)"
            :event="event"
          />
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import LocationUpcomingEventsListItem from "../../../../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEventListItem.vue";
import TwoButtonDialogModal from "../../../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";

export default {
  data() {
    return {
      addEventKey: undefined,
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
    initializeAddToEvent(event) {
      console.log(event);
      this.addEventKey = { userId: event.userId, tenantId: event.tenantId };
    },
    closeConfirmationDialog() {
      this.addEventKey = undefined;
    },
    async addUserToEvent() {
      let contactPayload = {
        contactKey: this.contact.userId,
        operation: "addToList",
        variable: "associatedEvents",
        value: {
          key: this.addEventKey,
          role: this.contact.role,
        },
      };
      let eventPayload = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        operation: "addToList",
        variable: "contacts",
        value: {
          key: { userId: this.contact.userId, tenantId: this.contact.tenantId },
          role: this.contact.role,
        },
      };
      console.log("contact", contactPayload);
      console.log("event", eventPayload);
      await this.$store.dispatch("editContact", contactPayload);
      await this.$store.dispatch("editEvent", eventPayload);
      this.closeConfirmationDialog();
    },
  },
  computed: {
    allEvents() {
      let today = new Date().getTime();
      console.log(this.$store.state.events);
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