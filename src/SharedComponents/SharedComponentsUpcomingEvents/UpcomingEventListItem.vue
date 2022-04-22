<template>
  <div class="single-event-item" @click="eventClicked">
    <div class="client-event-identifier">
      <contact v-if="client" :contact="client" />
      <client-skeleton-card v-if="!client" />
    </div>
    <div class="event-location-identifier">
      <location :location="location" v-if="this.event.locations.length > 0" />
      <location-skeleton-card v-if="!location.name" />
    </div>
    <div
      class="event-metadata-identifier"
      v-if="(location.name || client) && event.data.date"
    >
      <div class="date-and-time-identifier">
        <p>{{ formatDate(event.data.date) }}</p>
        <p>
          {{ formatTime(event.data.startTime) }} -
          {{ formatTime(event.data.endTime) }}
        </p>
      </div>
      <div
        class="event-invoice-metadata"
        v-if="userRole === 'admin' || userRole === 'client'"
      >
        <p>
          {{ formatPrice(balanceOutstanding(event.invoice, event.data)) }}
          Outstanding
        </p>
      </div>
    </div>
    <event-skeleton-card
      v-if="(!location.name && !client) || !event.data.date"
    />
  </div>
</template>

<script>
import Contact from "../SharedComponentsUI/ListComponents/ContactProfilePictureAndName.vue";
import Location from "../SharedComponentsUI/ListComponents/LocationNameAndAddressStacked.vue";
import ClientSkeletonCard from "../SharedComponentsUI/SkeletonCards/SkeletonProfilePictureName.vue";
import LocationSkeletonCard from "../SharedComponentsUI/SkeletonCards/SkeletonLocationListItem.vue";
import EventSkeletonCard from "../SharedComponentsUI/SkeletonCards/SkeletonUpcomingEventInformation.vue";
import {
  formatDate,
  formatTime,
  formatPrice,
  balanceOutstanding,
} from "../../helpers.js";

export default {
  data() {
    return {};
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
    client() {
      return this.event.contacts[0];
    },
    location() {
      if (this.event.locations.length > 0) {
        return this.event.locations[0];
      } else {
        return {
          name: "Unknown",
          address: {
            streetAddress1: "Unknown",
            cityStateZip: "Unknown",
          },
        };
      }
    },
  },
  methods: {
    formatDate,
    formatTime,
    formatPrice,
    balanceOutstanding,
    eventClicked() {
      this.$emit("clicked");
    },
  },
  emits: ["clicked"],
  props: ["event", "first", "loaded"],
  components: {
    // SkeletonCard,
    Contact,
    Location,
    ClientSkeletonCard,
    LocationSkeletonCard,
    EventSkeletonCard,
  },
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  .client-event-identifier,
  .event-location-identifier,
  .event-metadata-identifier {
    display: flex;
    max-width: 33%;
    min-width: 33%;
    width: 33%;
  }

  .single-event-item {
    display: flex;
    width: 100%;
    height: fit-content;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid var(--cardOutline);
    filter: drop-shadow(0px 1px 1px var(--cardOutline));
    background-color: var(--foregroundColor);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 0 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .single-event-item:hover {
    filter: drop-shadow(0px 2px 2px var(--cardOutline));
  }

  .event-location-identifier {
    flex-direction: column;
    justify-content: center;
  }

  .venue-name,
  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
  }

  .event-metadata-identifier {
    display: flex;
    flex-direction: column;
    font-size: 10pt;
    text-align: right;
    justify-content: center;
  }
  h5 {
    font-size: 10px;
  }
  .client-name {
    background-image: black;
    font-size: 10px;
  }

  .venue-name {
    font-size: 9px;
  }

  .event-address * {
    font-size: 8px;
    margin: 3px;
  }

  .date-and-time-identifier *,
  .event-invoice-metadata * {
    font-size: 8px;
    margin: 3px;
  }
}
@media screen and (min-width: 411px) {
  .client-name {
    font-size: 0.7em;
  }

  .venue-name {
    font-size: 0.7em;
  }

  .event-address * {
    font-size: 0.7em;
  }

  .date-and-time-identifier *,
  .event-invoice-metadata * {
    font-size: 0.7em;
  }
}
@media screen and (min-width: 475px) {
  .client-name {
    font-size: 0.8em;
  }

  .venue-name {
    font-size: 0.8em;
  }

  .event-address * {
    font-size: 0.8em;
    margin: 3px;
  }

  .date-and-time-identifier *,
  .event-invoice-metadata * {
    font-size: 0.8em;
    margin: 3px;
  }
}
@media screen and (min-width: 550px) {
  .client-name {
    font-size: 0.9em;
  }

  .venue-name {
    font-size: 0.9em;
  }

  .event-address * {
    font-size: 0.8em;
    margin: 3px;
  }

  .date-and-time-identifier *,
  .event-invoice-metadata * {
    font-size: 0.8em;
    margin: 3px;
  }
}

@media screen and (min-width: 650px) {
  .client-name {
    font-size: 1em;
  }

  .venue-name {
    font-size: 1em;
  }

  .event-address * {
    font-size: 0.9em;
    margin: 3px;
  }

  .date-and-time-identifier *,
  .event-invoice-metadata * {
    font-size: 0.9em;
    margin: 3px;
  }
}

@media screen and (min-width: 800px) {
  .client-name {
    background-image: black;
    font-size: 0.9em;
  }

  .venue-name {
    font-size: 0.9em;
  }
  .date-and-time-identifier *,
  .event-invoice-metadata *,
  .event-address * {
    font-size: 0.8em;
    margin: 3px;
  }
}
</style>