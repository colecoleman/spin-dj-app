<template>
  <base-card
    svg="location-marker"
    title="Locations"
    :searchIcon="userRole === 'admin'"
    :searchResults="searchLocations"
    :inputValue="searchLocationName"
    :searchResultFormat="['name']"
    @search-input="searchForLocation"
    @select-search-result="selectLocation"
    @search-blurred="searchBlurred"
  >
    <template v-slot:content>
      <two-button-dialog-modal
        v-if="removeLocationOpen"
        @select-button-one="confirmRemoveLocation"
        @select-button-two="toggleRemoveLocation"
        @close-modal="toggleRemoveLocation"
      />
      <div id="specific-event-page-location-scroller-wrapper">
        <round-icon-button
          id="left-arrow"
          class="arrow-container"
          v-if="locations.length > 1"
          @click="decrementCounter()"
          svg="left-arrow"
        />

        <location-gallery-item
          :location="location"
          @initiateDeleteLocation="toggleRemoveLocation"
        />
        <round-icon-button
          id="right-arrow"
          class="arrow-container"
          svg="right-arrow"
          v-if="locations.length > 1"
          @click="incrementCounter()"
        />
      </div>
    </template>
  </base-card>
</template>

<script>
import RoundIconButton from "../../SharedComponentsUI/RoundIconButton.vue";
import LocationGalleryItem from "./LocationGalleryItem.vue";
import TwoButtonDialogModal from "../../SharedComponentsUI/TwoButtonDialogModal.vue";

export default {
  data() {
    return {
      counter: 0,
      searchLocationName: undefined,
      removeLocationOpen: false,
    };
  },
  methods: {
    toggleRemoveLocation() {
      this.removeLocationOpen = !this.removeLocationOpen;
    },
    async confirmRemoveLocation() {
      let index = this.counter;
      let payload = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        operation: "removeFromList",
        variable: "locations",
        value: index,
      };
      await this.$store.dispatch("editEvent", payload);
      this.counter = 0;
      this.toggleRemoveLocation();
    },
    searchForLocation(val) {
      this.searchLocationName = val;
    },
    async selectLocation(location) {
      let locationKey = {
        key: {
          userId: location.userId,
          tenantId: location.tenantId,
        },
      };
      let eventKey = {
        key: {
          userId: this.event.userId,
          tenantId: this.event.tenantId,
        },
      };
      let eventEditPayload = {
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
        operation: "addToList",
        variable: "locations",
        value: locationKey,
      };
      let locationPayload = {
        locationId: location.userId,
        operation: "addToList",
        variable: "associatedEvents",
        value: eventKey,
      };
      await this.$store.dispatch("editEvent", eventEditPayload);
      await this.$store.dispatch("editLocation", locationPayload);
      this.counter = 0;
    },
    decrementCounter() {
      if (this.counter === 0) {
        this.counter = this.locations.length;
      } else {
        this.counter--;
      }
    },
    incrementCounter() {
      if (this.counter === this.locations.length - 1) {
        this.counter = 0;
      } else {
        this.counter++;
      }
    },
    searchBlurred() {
      this.searchLocationName = undefined;
    },
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
    location() {
      return this.locations[this.counter];
    },
    locations() {
      return this.event.locations;
    },
    venueName() {
      return this.locations[this.counter]
        ? this.locations[this.counter].name
        : "";
    },
    searchLocations() {
      if (this.searchLocationName) {
        if (this.$store.getters.locations.length < 3) {
          this.$store.dispatch("getLocations");
        }
        let locations = this.$store.getters.locations;
        let term = this.searchLocationName.toLowerCase();
        return locations.filter((x) => {
          if (x.name) {
            return x.name.toLowerCase().includes(term);
          }
        });
      }
      return [];
    },
  },
  props: ["event"],
  components: {
    LocationGalleryItem,
    TwoButtonDialogModal,
    RoundIconButton,
  },
};
</script>

<style scoped>
#specific-event-page-location-scroller-wrapper {
  width: 100%;
  height: 100%;
  min-height: 200px;
  position: relative;
}
.arrow-container {
  position: absolute;
  top: 20%;
  z-index: 2;
  padding: 5px;
}

#left-arrow {
  left: 0;
}
#right-arrow {
  right: 0;
}
</style>
