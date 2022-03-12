<template>
  <div class="single-event-item" v-if="event" :class="loading ? loading : ''">
    <div class="event-location-identifier" v-if="primaryLocation">
      <h4 class="venue-name">{{ primaryLocation.name }}</h4>
      <h4 class="venue-name">{{ primaryLocation.name }}</h4>
      <div class="event-address">
        <p v-if="primaryLocation.address">
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
    <div id="event-metadata-identifier">
      <div id="date-and-time-identifier">
        <p>{{ formatDate(event.data.date) }}</p>
        <p>
          {{ formatTime(event.data.startTime) }} -
          {{ formatTime(event.data.endTime) }}
        </p>
      </div>
      <div id="event-invoice-metadata">
        <p>
          {{ formatPrice(balanceOutstanding(event.invoice, event.data)) }}
          Outstanding
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  formatDate,
  formatTime,
  formatPrice,
  balanceOutstanding,
} from "../../helpers.js";

export default {
  data() {
    return {
      loading: true,
      primaryLocation: undefined,
    };
  },
  methods: {
    formatDate,
    formatTime,
    formatPrice,
    balanceOutstanding,
  },
  mounted() {
    this.loading = true;
    if (this.event.locations.length > 0) {
      this.$store
        .dispatch("getLocation", this.event.locations[0])
        .then((res) => {
          console.log(res);
          if (res) {
            this.primaryLocation = res
          }
        });
    }

    this.loading = false;
  },
  props: ["event", "first"],
};
</script>

<style scoped>
#event-location-identifier,
#event-metadata-identifier {
  display: flex;
  flex: 1;
}
.single-event-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--cardOutline);
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

#event-metadata-identifier {
  flex-direction: column;
  font-size: 10pt;
  text-align: right;
}
</style>