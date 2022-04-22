<template>
  <list-item-style-wrapper @click="eventClicked" hoverable="true">
    <div class="client-event-identifier">
      <contact :contact="client" />
    </div>
    <div class="event-location-identifier">
      <location :location="location" v-if="this.event.locations.length > 0" />
      <location-skeleton-card v-if="!location.name" />
    </div>
    <div class="event-metadata-identifier">
      <event-data
        v-if="(location.name || client) && event.data.date"
        :event="event"
      />
      <event-skeleton-card
        v-if="(!location.name && !client) || !event.data.date"
      />
    </div>
  </list-item-style-wrapper>
</template>

<script>
import Contact from "../SharedComponentsUI/ListComponents/ContactProfilePictureAndName.vue";
import Location from "../SharedComponentsUI/ListComponents/LocationNameAndAddressStacked.vue";
import EventData from "../SharedComponentsUI/ListComponents/EventDateTimeBalance.vue";
import LocationSkeletonCard from "../SharedComponentsUI/SkeletonCards/SkeletonLocationListItem.vue";
import EventSkeletonCard from "../SharedComponentsUI/SkeletonCards/SkeletonUpcomingEventInformation.vue";
import ListItemStyleWrapper from "../SharedComponentsUI/ListItemStyleWrapper.vue";

export default {
  computed: {
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
    EventData,
    LocationSkeletonCard,
    EventSkeletonCard,
    ListItemStyleWrapper,
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

  .event-location-identifier {
    flex-direction: column;
    justify-content: center;
  }

  .event-metadata-identifier {
    display: flex;
    flex-direction: column;
    font-size: 10pt;
    text-align: right;
    justify-content: center;
  }
}
</style>