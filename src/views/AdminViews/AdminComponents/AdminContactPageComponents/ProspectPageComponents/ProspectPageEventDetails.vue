<template>
  <base-card :icon="SVGs.InfoIconSvg" title="Event Details">
    <template v-slot:content>
      <h5 v-if="!prospect.eventDetails">No event found for this prospect.</h5>
      <div id="event-details-wrapper">
        <div class="event-details-content">
          <div class="location-wrapper">
            <div
              id="location-add-button"
              v-if="!prospect.eventDetails"
              @click="toggleAddLocation()"
            >
              <img :src="SVGs.LocationAddSVG" class="big-add-svg-icon" alt="" />
              <h5>No locations yet.</h5>
              <h5><b>Click to add one.</b></h5>
            </div>
            <div class="add-location-fields" v-if="addLocationOpen">
              <h5>Venue Name:</h5>
              <input type="text" v-model="event.location.venueName" />
              <h5>Address 1:</h5>
              <input type="text" v-model="event.location.address1" />
              <h5>Address 2:</h5>
              <input type="text" v-model="event.location.address2" />
              <button-standard-with-icon
                text="Submit"
                @click="addLocation()"
              ></button-standard-with-icon>
            </div>
            <div class="location-information" v-if="prospect.eventDetails">
              <div class="map-box"></div>
              <h4>{{ prospect.eventDetails.eventLocations[0].venueName }}</h4>
              <h5>{{ prospect.eventDetails.eventLocations[0].address1 }}</h5>
              <h5>{{ prospect.eventDetails.eventLocations[0].address2 }}</h5>
            </div>
          </div>
          <div class="timeline-wrapper">
            <div
              id="date-time-add-button"
              v-if="!addDateTimeOpen && !prospect.eventDetails"
              @click="toggleAddDateTime()"
            >
              <img
                :src="SVGs.AddTimeClockSVG"
                class="big-add-svg-icon"
                alt=""
              />
              <h5>No date or time yet.</h5>
              <h5><b>Click to add.</b></h5>
            </div>
            <div class="add-date-time-fields" v-if="addDateTimeOpen">
              <h5>Event Date:</h5>
              <input
                type="date"
                v-model="event.details.date"
                :class="errors.date ? 'error' : ''"
              />
              <h5>Starting Time:</h5>
              <input
                type="time"
                v-model="event.details.startingTime"
                :class="errors.startingTime ? 'error' : ''"
              />
              <h5>Ending Time:</h5>
              <input
                type="time"
                v-model="event.details.endingTime"
                :class="errors.endingTime ? 'error' : ''"
              />
              <button-standard-with-icon
                text="Submit"
                @click="addDateAndTime()"
              ></button-standard-with-icon>
            </div>
            <div class="location-information" v-if="prospect.eventDetails">
              <h4>{{ formatDate(prospect.eventDetails.eventDate) }}</h4>
              <h5
                v-if="
                  prospect.eventDetails.eventStartTime &&
                  prospect.eventDetails.eventEndTime
                "
              >
                {{ formatTime(prospect.eventDetails.eventStartTime) }} -
                {{ formatTime(prospect.eventDetails.eventEndTime) }}
              </h5>
            </div>
          </div>
          <div class="package-wrapper">
            <div
              id="package-add-button"
              v-if="!addpackageOpen"
              @click="toggleAddPackage()"
            >
              <img :src="SVGs.AddPackageSVG" class="big-add-svg-icon" alt="" />
              <h5>No packages yet.</h5>
              <h5><b>Click to add one.</b></h5>
            </div>
          </div>
        </div>
        <!-- <p class="bottom"><i>click on element to change</i></p> -->
      </div>
    </template>
  </base-card>
</template>

<script>
import SVGs from "../../../../../assets/SVGs/svgIndex.js";
import helpers from "../../../../../helpers.js";

export default {
  data() {
    return {
      SVGs,
      addLocationOpen: false,
      addDateTimeOpen: false,

      event: {
        location: {
          venueName: undefined,
          address1: undefined,
          address2: undefined,
        },
        details: {
          date: undefined,
          startingTime: undefined,
          endingTime: undefined,
        },
      },
      errors: {
        date: false,
        startingTime: false,
        endingTime: false,
      },
    };
  },
  computed: {},
  methods: {
    formatTime: helpers.formatTime,
    formatDate: helpers.formatDate,
    toggleAddLocation() {
      this.addLocationOpen = !this.addLocationOpen;
    },
    toggleAddDateTime() {
      this.addDateTimeOpen = !this.addDateTimeOpen;
    },
    toggleAddPackage() {},
    addLocation() {
      let payload = {
        location: this.event.location,
        id: this.prospect.id,
      };
      this.addLocationOpen = false;
      this.$store.dispatch("addProspectLocation", payload);
    },
    addDateAndTime() {
      let payload = {
        id: this.prospect.id,
        eventDate: undefined,
        eventStartTime: undefined,
        eventEndTime: undefined,
      };
      if (!this.event.details.date) {
        this.errors.date = true;
      } else {
        this.errors.date = false;
      }
      if (!this.event.details.startingTime) {
        this.errors.startingTime = true;
      } else {
        this.errors.startingTime = false;
      }
      if (!this.event.details.endingTime) {
        this.errors.endingTime = true;
      } else {
        this.errors.endingTime = false;
      }
      if (
        this.errors.date === false &&
        this.errors.startingTime === false &&
        this.errors.endingTime === false
      ) {
        switch (true) {
          case this.event.details.startingTime < this.event.details.endingTime:
            payload.eventDate = new Date(
              this.event.details.date + "T" + this.event.details.startingTime
            );
            payload.eventStartTime = new Date(
              this.event.details.date + "T" + this.event.details.startingTime
            );
            payload.eventEndTime = new Date(
              this.event.details.date + "T" + this.event.details.endingTime
            );
            this.addDateTimeOpen = false;
            this.$store.dispatch("addProspectDateTime", payload);
            break;
          case this.event.details.startingTime >= this.event.details.endingTime:
            payload.eventDate = new Date(
              this.event.details.date + "T" + this.event.details.startingTime
            );
            payload.eventStartTime = new Date(
              this.event.details.date + "T" + this.event.details.startingTime
            );
            payload.eventEndTime = new Date(
              this.event.details.date + "T" + this.event.details.endingTime
            );
            payload.eventEndTime.setDate(payload.eventEndTime.getDate() + 1);
            this.addDateTimeOpen = false;
            this.$store.dispatch("addProspectDateTime", payload);
            break;
        }
      }
    },
  },
  props: ["prospect"],
  components: {},
};
</script>

<style scoped>
#event-details-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.event-details-content {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.location-wrapper,
.timeline-wrapper,
.package-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.add-date-timefields,
.add-location-fields {
  text-align: center;
}

.big-add-svg-icon {
  margin: 10px;
}

.location-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.map-box {
  border: 1px solid var(--cardOutline);
  border-radius: 10px;
  width: 100%;
  height: 75px;
  margin: 10px;
}

input {
  width: 80%;
  margin: 5px;
  /* margin-left: 20%; */
}

.error {
  border: 1px solid red;
}

.bottom {
  justify-self: end;
}
</style>