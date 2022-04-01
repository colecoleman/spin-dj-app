<template>
  <two-button-dialog-modal
    v-if="removeLocationOpen"
    @select-button-one="confirmRemoveLocation"
    @select-button-two="toggleRemoveLocation"
    @close-modal="toggleRemoveLocation"
  />
  <base-card
    svg="location-marker"
    title="Locations"
    :subtitle="addLocationOpen ? 'Add New Location' : venueName"
    actionIcon="plus-sign"
    @actionOneClicked="toggleAddLocation()"
  >
    <template v-slot:content>
      <div
        id="specific-event-page-location-scroller-wrapper"
        v-if="!addLocationOpen"
      >
        <vue-svg
          svg="left-arrow"
          v-if="locations.length > 1"
          @clicked="decrementCounter()"
        />
        <specific-event-page-location-scroller-item
          :location="location"
          v-if="locations.length > 0"
          @initiateDeleteLocation="toggleRemoveLocation"
        ></specific-event-page-location-scroller-item>
        <vue-svg
          svg="right-arrow"
          v-if="locations.length > 1"
          @clicked="incrementCounter()"
        />
      </div>
      <div class="add-location" v-if="addLocationOpen">
        <div class="form-input">
          <input-with-title-with-dropdown
            title="Location Name:"
            placeholder="Start Typing..."
            :inputValue="searchLocationName"
            @input="searchForLocation($event)"
            @dropdown-selected="selectLocation($event)"
            :dropdownSelections="searchLocations"
            :dropdownDisplay="['name']"
          />
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import VueSvg from "../../../assets/VueSvg.vue";
import InputWithTitleWithDropdown from "../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitleWithDropdown.vue";
import SpecificEventPageLocationScrollerItem from "./SpecificEventPageLocationScrollerItem.vue";
import TwoButtonDialogModal from "../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";

export default {
  data() {
    return {
      counter: 0,
      // locations: [],
      addLocationOpen: false,
      searchLocationName: undefined,
      removeLocationOpen: false,
    };
  },
  methods: {
    toggleAddLocation() {
      this.addLocationOpen = !this.addLocationOpen;
    },
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

      if (this.locations[this.counter].associatedEvents) {
        let userId = this.locations[this.counter].key
          ? this.locations[this.counter].key.userId
          : this.locations[this.counter];
        let eventKey = {
          userId: this.event.userId,
          tenantId: this.event.tenantId,
        };
        let contactParameters = {
          contactKey: { userId: userId, tenantId: this.event.tenantId },
          variable: "associatedEvents",
          value: eventKey,
        };
        let index = await this.$store.dispatch(
          "removeEventFromContact",
          contactParameters
        );
        this.locations.splice(index, 1);
      }
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
      this.locations.push(location);
      this.toggleAddLocation();
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
  },
  computed: {
    location() {
      return this.locations[this.counter] ? this.locations[this.counter] : {};
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
        return locations.filter((x) => x.name.toLowerCase().includes(term));
      }
      return [];
    },
  },
  props: ["event"],
  components: {
    SpecificEventPageLocationScrollerItem,
    TwoButtonDialogModal,
    VueSvg,
    InputWithTitleWithDropdown,
  },
};
</script>

<style scoped>
#specific-event-page-location-scroller-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  align-items: center;
  width: 100%;
  height: 100%;
}

.form-input {
  display: flex;
  justify-content: center;
  position: relative;
}

.form-input .input-with-dropdown-selection-parent {
  width: 90%;
  margin-right: 0;
}
</style>
