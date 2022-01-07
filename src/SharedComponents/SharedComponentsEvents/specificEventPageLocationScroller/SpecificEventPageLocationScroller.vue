<template>
  <base-card
    :icon="SVGs.LocationMarkerSVG"
    title="Locations"
    :subtitle="venueName"
  >
    <template v-slot:subtitle>{{ venueName }}</template>
    <template v-slot:content>
      <div id="specific-event-page-location-scroller-wrapper">
        <img
          v-if="locations.length > 1"
          :src="SVGs.LeftArrowSVG"
          @click="decrementCounter()"
        />

        <specific-event-page-location-scroller-item
          :location="location"
          v-if="locations.length > 0"
        ></specific-event-page-location-scroller-item>

        <img
          v-if="locations.length > 1"
          :src="SVGs.RightArrowSVG"
          @click="incrementCounter()"
        />
      </div>
    </template>
  </base-card>
</template>

<script>
import SVGs from "../../../assets/SVGs/svgIndex.js";
import SpecificEventPageLocationScrollerItem from "./SpecificEventPageLocationScrollerItem.vue";

export default {
  data() {
    return {
      SVGs,
      counter: 0,
      locations: [],
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
  computed: {
    location() {
      return this.locations[this.counter] ? this.locations[this.counter] : {};
    },
    venueName() {
      return this.locations[this.counter]
        ? this.locations[this.counter].name
        : "";
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