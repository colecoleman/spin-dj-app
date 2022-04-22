<template>
  <list-item-style-wrapper
    class="single-event-item"
    hoverable="true"
    @click="routeToEvent()"
  >
    <location-name-and-address-stacked
      class="event-location-identifier"
      :location="location"
      v-if="location"
    />
    <p v-if="!location">Unknown Location</p>
    <event-date-time-balance class="event-metadata-identifier" :event="event" />
  </list-item-style-wrapper>
</template>

<script>
import ListItemStyleWrapper from "../../../../../SharedComponents/SharedComponentsUI/ListItemStyleWrapper.vue";
import LocationNameAndAddressStacked from "../../../../../SharedComponents/SharedComponentsUI/ListComponents/LocationNameAndAddressStacked.vue";
import EventDateTimeBalance from "../../../../../SharedComponents/SharedComponentsUI/ListComponents/EventDateTimeBalance.vue";

export default {
  computed: {
    location() {
      return this.event.locations[0];
    },
  },
  methods: {
    routeToEvent() {
      this.$router.push("events/" + this.event.id);
    },
  },
  components: {
    EventDateTimeBalance,
    ListItemStyleWrapper,
    LocationNameAndAddressStacked,
  },
  props: ["event"],
};
</script>

<style scoped>
@media screen {
  .event-location-identifier,
  .event-metadata-identifier {
    width: 50%;
  }

  .event-location-identifier {
    flex-direction: column;
    justify-content: left;
    text-align: left;
  }

  p {
    font-size: 0.65em;
    margin: 5px 0px;
  }

  .event-location-identifier >>> * {
    text-align: left;
  }

  .event-metadata-identifier {
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