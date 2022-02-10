<template>
  <div class="list-wrapper">
    <div class="list-group">
      <h4>Events:</h4>
      <div class="default-text" v-if="events.length < 1">
        <h5>No Events Found This Month!</h5>
      </div>
      <div class="list-wrapper" v-if="events.length > 0">
        <div
          :class="
            chosenEvents.includes(event.id) || event.unavailable === true
              ? 'faded list-item'
              : 'list-item'
          "
          v-for="event in events"
          :key="event.id"
          @click="event.unavailable ? '' : selectEvent(event)"
        >
          <div id="client-event-identifier">
            <img :src="defaultProfilePicture" alt="" />
            <h5 id="client-name">
              {{ event.client[0].given_name }} <br />
              <span> {{ event.client[0].family_name }}</span>
            </h5>
          </div>
          <div class="event-location-identifier">
            <h5 class="venue-name">{{ event.primaryLocation[0].name }}</h5>
          </div>
          <div id="event-metadata-identifier">
            <div id="date-and-time-identifier">
              <h5>{{ formatDate(event.eventStartTime) }}</h5>
              <h5>
                {{ formatTime(event.eventStartTime) }} -
                {{ formatTime(event.eventEndTime) }}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button-standard-with-icon
        :text="
          chosenEvents.length === 1
            ? `Assign To Event (${chosenEvents.length})`
            : chosenEvents.length > 1
            ? `Assign To Events (${chosenEvents.length})`
            : 'Click on Events To Assign'
        "
        @click="chosenEvents.length > 0 ? assignEmployeesToEvents() : ''"
      />
    </div>
  </div>
</template>

<script>
import { formatDate, formatTime } from "../../../../../helpers.js";
import defaultProfilePicture from "../../../../../assets/default-profile-picture.svg";
export default {
  data() {
    return {
      defaultProfilePicture,
      chosenEvents: [],
    };
  },
  beforeUpdate() {
    this.events.map((event) => {
      let unavailableDates = this.employee.unavailableDates;
      let simpleDateFormat = event.eventStartTime.toISOString().split("T")[0];
      event.unavailable = unavailableDates.includes(simpleDateFormat);
    });
  },
  methods: {
    formatDate,
    formatTime,
    selectEvent(event) {
      if (this.chosenEvents.includes(event.id)) {
        let index = this.chosenEvents.indexOf(event.id);
        this.chosenEvents.splice(index, 1);
      } else {
        this.chosenEvents.push(event.id);
      }
    },
    assignEmployeesToEvents() {
      this.chosenEvents.forEach((eventId) => {
        let payload = {
          employee: this.employee.id,
          eventId: eventId,
        };
        this.$store.dispatch("addEmployeeToEvent", payload);
      });
    },
  },
  props: ["events", "employee"],
};
</script>

<style scoped>
.list-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  overflow-x: none;
}

.list-group {
  min-height: 90%;
  max-height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.default-text {
  align-self: center;
  width: 100%;
  margin: 10px;
}

.list-item {
  display: flex;
  flex-direction: row;
  width: 95%;
  justify-content: space-between;
  margin: 10px;
  cursor: pointer;
}

.faded {
  opacity: 0.5;
}

#client-event-identifier {
  display: flex;
  flex-direction: row;
}

img {
  height: 30px;
  width: 30px;
  padding: 5px;
}

#client-name,
.venue-name {
  text-align: left;
  max-width: 65px;

  width: 90%;
  overflow: hidden;
}

.list-wrapper {
  display: flex;
  flex-direction: column;
}

.button-container {
  justify-self: flex-end;
  align-content: flex-end;
}
</style>