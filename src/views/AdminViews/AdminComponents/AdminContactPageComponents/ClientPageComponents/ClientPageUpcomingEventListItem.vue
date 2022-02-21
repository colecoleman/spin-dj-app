<template>
  <div id="single-event-item" @click="routeToEvent()" v-if="loaded">
    <div class="event-location-identifier" v-if="location">
      <h4 class="venue-name">{{ location.name }}</h4>
      <div class="event-address">
        <p v-if="location.address">
          {{ location.address.streetAddress1 }}
        </p>
        <p v-if="!location.address">Unknown Location</p>
        <div v-if="location.address">
          <p v-if="location.address.streetAddress2">
            {{ location.address.streetAddress2 }}
          </p>
        </div>
        <p v-if="location.address">
          {{ location.address.cityStateZip }}
        </p>
      </div>
    </div>
    <p v-if="!location">Unknown Location</p>
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
import defaultProfilePicture from "../../../../../assets/default-profile-picture.svg";
import {
  formatDate,
  formatTime,
  formatPrice,
  balanceOutstanding,
} from "../../../../../helpers.js";

export default {
  data() {
    return {
      defaultProfilePicture,
      location: undefined,
      loaded: false,
    };
  },
  methods: {
    formatDate,
    formatTime,
    formatPrice,
    balanceOutstanding,
    routeToEvent() {
      this.$router.push("events/" + this.event.id);
    },
  },
  props: ["event"],
  created() {
    this.$store.dispatch("getLocation", this.event.locations[0]).then((res) => {
      this.location = res.Item;
      this.loaded = true;
    });
  },
};
</script>

<style scoped>
@media screen {
  #event-location-identifier,
  #event-metadata-identifier {
    display: flex;
    /* max-width: 50%; */
    width: 50%;
  }

  .event-address {
    text-align: left;
  }

  #single-event-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--cardOutline);
    cursor: pointer;
  }

  .event-location-identifier {
    flex-direction: column;
    justify-content: center;
  }

  .venue-name {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    font-size: 0.75em;
  }

  p {
    font-size: 0.65em;
    margin: 5px 0px;
  }

  #event-metadata-identifier {
    flex-direction: column;
    text-align: right;
  }

  @media (min-width: 600px) {
    p {
      font-size: 0.75em;
    }
    .venue-name {
      font-size: 0.9em;
    }
  }
  @media (min-width: 850px) {
    p {
      font-size: 0.65em;
    }
    .venue-name {
      font-size: 0.75em;
    }
  }
}
</style>