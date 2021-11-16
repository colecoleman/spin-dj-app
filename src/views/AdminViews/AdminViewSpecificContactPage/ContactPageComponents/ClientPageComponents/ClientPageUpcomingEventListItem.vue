<template>
  <div id="single-event-item" @click="routeToEvent()" v-if="loaded">
    <div class="event-location-identifier">
      <h4 class="venue-name">{{ location.name }}</h4>
      <div class="event-address">
        <p>{{ location.address.streetAddress1 }}</p>
        <p>{{ location.address.cityStateZip }}</p>
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
import defaultProfilePicture from "../../../../../assets/default-profile-picture.svg";
import helpers from "../../../../../helpers.js";

export default {
  data() {
    return {
      defaultProfilePicture,
      location: undefined,
      loaded: false,
    };
  },
  methods: {
    formatDate: helpers.formatDate,
    formatTime: helpers.formatTime,
    formatPrice: helpers.formatPrice,
    balanceOutstanding: helpers.balanceOutstanding,
    routeToEvent() {
      this.$router.push("events/" + this.event.id);
    },
  },
  computed: {
    matchedClient() {
      let firstClient = this.event.associatedContacts.find(
        (x) => x.role === "client"
      );
      let item = this.$store.state.contacts[`${firstClient.role + "s"}`].find(
        (x) => x.id === firstClient.id
      );
      item.role = firstClient.role;
      return item;
    },
  },
  props: ["event"],
  created() {
    console.log(this.event);
    this.$store.dispatch("getLocation", this.event.locations[0]).then((res) => {
      this.location = res.Item;
      this.loaded = true;
    });
  },
};
</script>

<style scoped>
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

#client-event-identifier img {
  height: 40px;
  width: 40px;
  margin: 10px;
}
#client-name {
  font-size: 10pt;
  display: flex;
  flex-direction: column;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.event-location-identifier {
  font-size: 10pt;
  flex-direction: column;
  justify-content: center;
}

.venue-name {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}

h5 {
  font-weight: 300;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
}

h5 span {
  font-weight: 600;
}

#event-metadata-identifier {
  flex-direction: column;
  font-size: 10pt;
  text-align: right;
}
</style>