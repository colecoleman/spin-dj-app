<template>
  <popup-modal @close-popup="closePopup()">
    <template v-slot:window>
      <section>
        <div class="heading">
          <h4>Calendar Utility</h4>
        </div>
        <div class="container">
          <div class="calendar-container">
            <popup-employee-calendar-dates
              @selected-date="selectDate"
              @current-month="assignMonth"
              @send-date="sendDate"
              :employee="employee"
            ></popup-employee-calendar-dates>
          </div>
          <div class="side-bar-container">
            <popup-employee-calendar-side-bar
              :events="events"
              :employee="employee"
            ></popup-employee-calendar-side-bar>
          </div>
        </div></section
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
    closePopup() {
      this.$emit("close-popup");
    },
    assignMonth(month) {
      this.displayedMonth = month;
    },
    selectDate(date) {
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
      }
    },
  },
  computed: {
    events() {
      return this.$store.state.events.filter((event) => {
        return (
          event.eventStartTime.getMonth() === this.selectedTime.getMonth() &&
          event.eventStartTime.getYear() === this.selectedTime.getYear()
        );
      });
    },
  },
  props: ["employee"],
  emits: ["close-popup"],
  components: {
    PopupModal,
    PopupEmployeeCalendarDates,
    PopupEmployeeCalendarSideBar,
  },
};
</script>

<style>
section {
  display: flex;
  flex-direction: column;
}
.heading {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#close-x {
  height: 10px;
  width: 10px;
  position: absolute;
  right: 10%;
}

.container {
  display: flex;
  flex-direction: row;

  height: 40vh;
  width: 100%;
}

.calendar-container {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.side-bar-container {
  width: 50%;
  display: flex;

  justify-content: center;
}
</style>