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
        <p v-if="location.name" class="location-name">
          {{ location.name }}
        </p>
        <div v-if="!location.name" class="skeleton location-name"></div>
        <p v-if="address.streetAddress1">
          {{ address.streetAddress1 }}
        </p>
        <div v-if="!address.streetAddress1" class="skeleton"></div>
        <p v-if="address.streetAddress2">
          {{ address.streetAddress2 }}
        </p>
        <div v-if="!address.cityStateZip" class="skeleton"></div>
        <p v-if="address.cityStateZip">
          {{ address.cityStateZip }}
        </p>
      </div>
      <div class="button-wrapper">
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
  },
  props: ["location", "index"],
  emits: ["initiateDeleteLocation"],
  components: {
    AwsLocationMapDisplay,
    RoundIconButton,
  },
};
</script>

<style scoped>
#specific-event-page-location-scroll-item-wrapper {
  height: 100%;
  /* width: 100%; */
  width: calc(100% + 42px);
  background-color: var(--cardOutline);
  left: -20px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
}

#map-container {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 50%;
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
}

.address {
  text-align: left;
  padding: 20px 20px;
  border-radius: 0px 15px 0 0;
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  border-bottom: 0;
  border-left: 0;
  /* width: fit-content; */
  /* height: fit-content; */
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
</style>
