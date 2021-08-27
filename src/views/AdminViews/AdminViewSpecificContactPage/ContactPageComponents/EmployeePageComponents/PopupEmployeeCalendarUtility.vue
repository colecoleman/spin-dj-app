<template>
  <popup-modal>
    <template v-slot:window>
      <h4>Calendar Utility</h4>
      <div class="container">
        <popup-employee-calendar-dates
          @selected-date="selectDate"
          @current-month="assignMonth"
          @send-date="sendDate"
        ></popup-employee-calendar-dates>
        <popup-employee-calendar-side-bar
          :events="events"
          :employee="employee"
        ></popup-employee-calendar-side-bar></div
    ></template>
  </popup-modal>
</template>

<script>
import PopupModal from "../../../../../SharedComponents/SharedComponentsUI/PopupModal.vue";
import PopupEmployeeCalendarDates from "./PopupEmployeeCalendarDates.vue";
import PopupEmployeeCalendarSideBar from "./PopupEmployeeCalendarSideBar.vue";

export default {
  data() {
    return {
      selectedTime: new Date(),
    };
  },
  methods: {
    assignMonth(month) {
      console.log(month);
      this.displayedMonth = month;
    },
    selectDate(date) {
      console.log(date);
      this.selectedDate = date;
      this.events = this.$store.state.events.filter((event) => {
        return (
          event.eventStartTime.getMonth() ===
          this.selectedDate.UTC.getUTCMonth()
        );
      });
    },
    sendDate(date) {
      this.selectedTime = date;
      console.log(this.selectedTime);
      this.mapClientsToEvents();
    },
    mapClientsToEvents() {
      for (const event of this.events) {
        event.client = this.$store.state.contacts.clients.filter(
          (x) =>
            x.id ===
            event.associatedContacts.filter((x) => x.role === "client")[0].id
        );
        event.primaryLocation = this.$store.state.contacts.locations.filter(
          (x) => x.id === event.eventLocations[0].locationId
        );
        console.log(event);
      }
    },
  },
  computed: {
    events() {
      return this.$store.state.events.filter((event) => {
        console.log(event);
        return event.eventStartTime.getMonth() === this.selectedTime.getMonth();
      });
    },
  },
  props: ["employee"],
  components: {
    PopupModal,
    PopupEmployeeCalendarDates,
    PopupEmployeeCalendarSideBar,
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  height: 40vh;
}
</style>