<template>
  <div id="specific-event-page-location-scroll-item-wrapper">
    <div id="map-container">
      <aws-location-map-display
        :address="address"
        containerId="map-container"
      />
    </div>
    <div id="bottom-content">
      <div class="address">
        <location :location="location" />
      </div>
      <div class="button-wrapper" v-if="userRole === 'admin'">
        <round-icon-button
          svg="location-marker"
          @click="navivateToLocation()"
        />
        <round-icon-button svg="trash-can" @click="initiateDeleteLocation()" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from "../../../helpers.js";
import Location from "../../SharedComponentsUI/ListComponents/LocationNameAndAddressStacked.vue";
import RoundIconButton from "../../SharedComponentsUI/RoundIconButton.vue";
import AwsLocationMapDisplay from "../../SharedComponentsUI/AwsLocationMapDisplay.vue";

export default {
  data() {
    return {
      client: null,
      mapInstance: null,
      mapName: "SpinSampleDisplay",
      credentials: null,
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
    address() {
      console.log(this.location);
      if (this.location.address) {
        return this.location.address;
      } else {
        return {};
      }
    },
  },
  methods: {
    formatTime,
    initiateDeleteLocation() {
      this.$emit("initiateDeleteLocation");
    },
    navigateToLocation() {
      this.$router.push(`contacts/locations/${this.location.userId}`);
    },
  },
  props: ["location", "index"],
  emits: ["initiateDeleteLocation"],
  components: {
    AwsLocationMapDisplay,
    RoundIconButton,
    Location,
  },
};
</script>

<style scoped>
#specific-event-page-location-scroll-item-wrapper {
  height: 100%;
  /* width: 100%; */
  width: calc(100% + 40px);
  background-color: var(--cardOutline);
  left: -20px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 25px 25px;
}

#map-container {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 50%;
  border-radius: 0 0 25px 25px;
  outline: 1px solid var(--cardOutline);
}

.button-wrapper {
  z-index: 2;
  width: fit-content;
  display: flex;
  padding-bottom: 5px;
}

#bottom-content {
  left: 0px;
  height: 50%;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  border-radius: 0 0 25px 25px;
}

.address {
  text-align: left;
  padding: 20px 20px;
  border-radius: 0px 15px 0 25px;
  background-color: var(--foregroundColor);
  box-sizing: border-box;
  z-index: 4;
}

.skeleton {
  background-color: var(--cardOutline);
  width: 90px;
  height: 8px;
  border-radius: 2px;
}

.location-name {
  font-size: 9pt;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-weight: 600;
}

p {
  margin: 2px;
}

input {
  z-index: 2;
}

@media screen and (min-width: 800px) and (max-width: 1050px) {
  .button-wrapper {
    flex-direction: column;
    margin: 0;
  }
}
</style>
