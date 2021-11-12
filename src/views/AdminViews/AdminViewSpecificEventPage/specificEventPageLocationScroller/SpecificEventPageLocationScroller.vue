<template>
  <base-card :icon="locationMarkerSvg">
    <template v-slot:title>Locations</template>
    <template v-slot:content>
      <div id="specific-event-page-location-scroller-wrapper">
        <img
          v-if="locations.length > 1"
          :src="leftArrow"
          @click="decrementCounter()"
        />

        <specific-event-page-location-scroller-item
          :location="locations[counter]"
          v-if="locations.length > 0"
        ></specific-event-page-location-scroller-item>

        <img
          v-if="locations.length > 1"
          :src="rightArrow"
          @click="incrementCounter()"
        />
      </div>
    </template>
  </base-card>
</template>

<script>
import leftArrow from "../../../../assets/SVGs/left-arrow.svg";
import rightArrow from "../../../../assets/SVGs/right-arrow.svg";
import SpecificEventPageLocationScrollerItem from "./SpecificEventPageLocationScrollerItem.vue";
import locationMarkerSvg from "../../../../assets/SVGs/location-marker.svg";

export default {
  data() {
    return {
      leftArrow,
      rightArrow,
      locationMarkerSvg,
      counter: 0,
    };
  },
  methods: {
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
  props: ["locations"],
  components: {
    SpecificEventPageLocationScrollerItem,
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
</style>