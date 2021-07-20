<template>
  <div id="specific-event-page-location-scroll-item-wrapper">
    <h4>{{ location.venueName }}</h4>
    <!-- <p>
      {{ formatTime(location.venueStartTime) }} -
      {{ formatTime(location.venueEndTime) }}
    </p> -->
    <div class="map-box"></div>
    <div class="address">
      <h4>{{ location.address1 }}</h4>
      <h4>{{ location.address2 }}</h4>
    </div>
  </div>
</template>

<script>
import helpers from "../../../../helpers.js";
export default {
  methods: {
    formatTime: helpers.formatTime,
  },
  props: ["location"],
};
</script>

<style scoped>
#specific-event-page-location-scroll-item-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.map-box {
  border: 1px solid white;
  border-radius: 10px;
  width: 80%;
  height: 75px;
  margin: 10px;
  min-height: 50%;
}

p {
  margin: 5px;
}

.address > h4 {
  font-weight: 400;
}
</style>