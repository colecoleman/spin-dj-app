<template>
  <list-item-style-wrapper
    class="single-event-item"
    hoverable="true"
    @click="routeToEvent()"
  >
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
    <event-date-time-balance class="event-metadata-identifier" :event="event" />
  </list-item-style-wrapper>
</template>

<script>
import ListItemStyleWrapper from "../../../../../SharedComponents/SharedComponentsUI/ListItemStyleWrapper.vue";
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
  },
  props: ["event"],
};
</script>

<style scoped>
@media screen {
  .event-location-identifier,
  .event-metadata-identifier {
    /* display: flex; */
    width: 50%;
  }

  .event-address {
    text-align: left;
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