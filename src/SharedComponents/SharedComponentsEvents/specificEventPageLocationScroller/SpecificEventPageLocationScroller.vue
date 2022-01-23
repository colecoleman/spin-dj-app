<template>
  <two-button-dialog-modal
    v-if="removeLocationOpen"
    @select-button-one="confirmRemoveLocation"
    @select-button-two="toggleRemoveLocation"
    @close-modal="toggleRemoveLocation"
  ></two-button-dialog-modal>
  <base-card
    :icon="SVGs.LocationMarkerSVG"
    title="Locations"
    :subtitle="addLocationOpen ? 'Add New Location' : venueName"
    :actionIcon="SVGs.PlusSignSVG"
    @actionOneClicked="toggleAddLocation()"
  >
    <template v-slot:content>
      <div
        id="specific-event-page-location-scroller-wrapper"
        v-if="!addLocationOpen"
      >
        <img
          v-if="locations.length > 1"
          :src="SVGs.LeftArrowSVG"
          @click="decrementCounter()"
        />

        <specific-event-page-location-scroller-item
          :location="location"
          v-if="locations.length > 0"
          @initiateDeleteLocation="toggleRemoveLocation"
        ></specific-event-page-location-scroller-item>

        <img
          v-if="locations.length > 1"
          :src="SVGs.RightArrowSVG"
          @click="incrementCounter()"
        />
      </div>
      <div class="add-location" v-if="addLocationOpen">
        <div class="form-input">
          <p>Location Name:</p>
          <div class="dropdown-parent">
            <input
              type="text"
              v-model="searchLocationName"
              @keydown="openLocationDropdown"
              placeholder="Start typing to find past location or add a new one."
            />
            <div
              class="dropdown"
              v-if="locationDropdownOpen && searchLocations.length > 0"
            >
              <div
                class="dropdown-item"
                v-for="location in searchLocations"
                :key="location.userId"
                :value="location.name"
                @click="selectLocation(location)"
              >
                <p class="location-name">{{ location.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import SVGs from "../../../assets/SVGs/svgIndex.js";
import SpecificEventPageLocationScrollerItem from "./SpecificEventPageLocationScrollerItem.vue";
import TwoButtonDialogModal from "../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";

export default {
  data() {
    return {
      SVGs,
      counter: 0,
      locations: [],
      addLocationOpen: false,
      locationDropdownOpen: false,
      searchLocationName: undefined,
      removeLocationOpen: false,
    };
  },
  methods: {
    openLocationDropdown() {
      this.locationDropdownOpen = true;
    },
    toggleAddLocation() {
      this.addLocationOpen = !this.addLocationOpen;
    },
    toggleRemoveLocation() {
      this.removeLocationOpen = !this.removeLocationOpen;
    },
    async confirmRemoveLocation() {
      console.log(this.locations[this.counter]);
      let index = this.event.locations.indexOf(
        this.locations[this.counter].userId
      );
      console.log(index);
      let payload = {
        eventId: this.event.userId,
        operation: "removeFromList",
        variable: "locations",
        value: index,
      };
      let locationPayloadIndex = this.locations[
        this.counter
      ].associatedEvents.indexOf(this.event.userId);
      let locationPayload = {
        locationId: this.locations[this.counter].userId,
        operation: "removeFromList",
        variable: "associatedEvents",
        value: locationPayloadIndex,
      };
      console.log(locationPayload);
      await this.$store.dispatch("editEvent", payload);
      await this.$store.dispatch("editLocation", payload);
      console.log(payload);
      this.counter = 0;
      this.locations.splice(index, 1);
      this.toggleRemoveLocation();
    },
    async selectLocation(location) {
      this.locationDropdownOpen = false;
      let eventEditPayload = {
        eventId: this.event.userId,
        operation: "addToList",
        variable: "locations",
        value: location.userId,
      };
      let locationPayload = {
        locationId: location.userId,
        variable: "associatedEvents",
        value: this.event.userId,
        operation: "addToList",
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
    venueName() {
      return this.locations[this.counter]
        ? this.locations[this.counter].name
        : "";
    },
    searchLocations() {
      if (this.searchLocationName) {
        console.log("hi");
        let term = this.searchLocationName.toLowerCase();
        return this.$store.state.contacts.locations.filter(
          (x) =>
            x.name.toLowerCase().includes(term) ||
            x.address.cityStateZip.toLowerCase().includes(term) ||
            x.address.streetAddress1.toLowerCase().includes(term)
        );
      }
      return [];
    },
  },
  props: ["event"],
  async created() {
    await this.event.locations.forEach((location) => {
      this.$store.dispatch("getLocation", location).then((res) => {
        this.locations.push(res.Item);
      });
    });
  },
  components: {
    SpecificEventPageLocationScrollerItem,
    TwoButtonDialogModal,
  },
};
</script>

<style scoped>
#specific-event-page-location-scroller-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

img {
  height: 16px;
  width: 16px;
}

.form-input {
  width: 100%;
}

.dropdown-parent {
  width: 100%;
}

.dropdown-parent > input {
  width: 80%;
}
</style>
