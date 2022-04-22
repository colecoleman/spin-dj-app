<template>
  <div class="single-event-item" v-if="event">
    <div class="event-location-identifier">
      <h4 v-if="primaryLocation.name" class="venue-name">
        {{ primaryLocation.name }}
      </h4>
      <div v-if="!primaryLocation.name" class="skeleton"></div>
      <div class="event-address" v-if="primaryLocation.address">
        <p>
          {{ primaryLocation.address.streetAddress1 }}
        </p>
        <p v-if="!primaryLocation.address">Unknown Location</p>
        <p v-if="primaryLocation.address.streetAddress2">
          {{ primaryLocation.address.streetAddress2 }}
        </p>
        <p v-if="primaryLocation.address">
          {{ primaryLocation.address.cityStateZip }}
        </p>
        <p v-if="!primaryLocation.address">Unknown Location</p>
      </div>
    </div>

    <event-date-time-balance class="event-metadata-identifier" :event="event" />
  </div>
</template>

<script>
import {
  formatDate,
  formatTime,
  formatPrice,
  balanceOutstanding,
} from "../../helpers.js";
import EventDateTimeBalance from "../SharedComponentsUI/ListComponents/EventDateTimeBalance.vue";

export default {
  computed: {
    primaryLocation() {
      return this.event.locations[0];
    },
  },
  methods: {
    formatDate,
    formatTime,
    formatPrice,
    balanceOutstanding,
  },
  props: ["event", "first"],
  components: {
    EventDateTimeBalance,
  },
};
</script>

<style scoped>
#event-location-identifier,
.event-metadata-identifier {
  display: flex;
  flex: 1;
}
.single-event-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--cardOutline);
  cursor: pointer;
}

.event-location-identifier {
  font-size: 10pt;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.venue-name {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}

.event-metadata-identifier {
  flex-direction: column;
  font-size: 10pt;
  text-align: right;
}
</style>