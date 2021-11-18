<template>
  <base-card
    :icon="discsvg"
    :actionIcon="eventAssignmentOpen ? xiconsvg : sortalpha"
    @action-one-clicked="
      eventAssignmentOpen ? eventAssignmentToggle() : toggleSortMenuOpened()
    "
  >
    <template v-slot:title>{{ title }}</template>
    <template v-slot:action1
      >{{ eventAssignmentOpen ? "Cancel" : "Sort" }}

      <floating-menu-with-list-items
        v-if="sortMenuOpened"
        :actions="sortItems"
        @actionClicked="selectSort"
      />
    </template>
    <template v-slot:content v-if="events">
      <div class="events-content" v-if="!eventAssignmentOpen && contact">
        <h5 @click="eventAssignmentToggle()" v-if="events.length == 0">
          {{ contact.given_name }} {{ contact.family_name }} has no events.
          <br />
          Click to assign to one.
        </h5>
        <div v-if="events.length > 0">
          <location-upcoming-events-list-item
            v-for="event in events"
            :key="event.id"
            :event="event"
            @click="navigateToEventPage(event.id), sortByDateDescending()"
          ></location-upcoming-events-list-item>
        </div>
      </div>
      <div class="events-content" v-if="eventAssignmentOpen">
        <div
          v-for="(event, index) in allEvents"
          :key="index"
          class="upcoming-event-list-item-container"
        >
          <location-upcoming-events-list-item
            @click="initializeAddToEvent(event.userId)"
            :event="event"
          >
          </location-upcoming-events-list-item>
          <two-button-dialog-modal
            v-if="addEventId"
            @close-modal="closeConfirmationDialog()"
            @select-button-one="addUserToEvent()"
            @select-button-two="closeConfirmationDialog()"
          ></two-button-dialog-modal>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import LocationUpcomingEventsListItem from "../../../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEventListItem.vue";
import FloatingMenuWithListItems from "../../../../../SharedComponents/SharedComponentsUI/FloatingMenuWithListItems.vue";
import TwoButtonDialogModal from "../../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";
import discsvg from "../../../../../assets/SVGs/disc.svg";
import sortalpha from "../../../../../assets/SVGs/sort-alpha.svg";
import xiconsvg from "../../../../../assets/SVGs/x-icon.svg";
export default {
  data() {
    return {
      discsvg,
      sortalpha,
      xiconsvg,
      sortMenuOpened: false,
      addEventId: undefined,
      events: [],
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
      this.$router.push("admin/events/" + id);
    },
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
        value: this.contact.userId,
      };
      await this.$store.dispatch("editContact", contactPayload);
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

  props: ["contact", "eventAssignmentOpen"],
  created() {
    console.log(this.contact);
    this.events = this.$store.state.events.filter(
      (x) =>
        x.contacts.includes(this.contact.userId) &&
        new Date(x.data.date).getTime() > new Date().getTime()
    );
  },
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

.upcoming-event-list-item-container {
  position: relative;
}
</style>