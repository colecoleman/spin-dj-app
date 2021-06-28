<template>
  <base-card>
    <template v-slot:icon
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="14.7"
        height="14"
        viewBox="0 0 14.7 21"
      >
        <path
          id="Icon_material-location-on"
          data-name="Icon material-location-on"
          d="M11.725,1.75A7.345,7.345,0,0,0,4.375,9.1c0,5.512,7.35,13.65,7.35,13.65s7.35-8.137,7.35-13.65A7.345,7.345,0,0,0,11.725,1.75Zm0,9.975A2.625,2.625,0,1,1,14.35,9.1,2.626,2.626,0,0,1,11.725,11.725Z"
          transform="translate(-4.375 -1.75)"
        />
      </svg>
    </template>
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
import leftArrow from "../../../assets/SVGs/left-arrow.svg";
import rightArrow from "../../../assets/SVGs/right-arrow.svg";
import BaseCard from "../../../components/UI/BaseCard.vue";
import SpecificEventPageLocationScrollerItem from "./SpecificEventPageLocationScrollerItem.vue";
export default {
  data() {
    return {
      leftArrow,
      rightArrow,
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
    BaseCard,
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

svg {
  fill: white;
}

img {
  height: 16px;
  width: 16px;
}
</style>