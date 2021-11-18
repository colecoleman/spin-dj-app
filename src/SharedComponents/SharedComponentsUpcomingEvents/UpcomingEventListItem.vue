<template>
  <div class="single-event-item" v-if="event" :class="loading ? loading : ''">
    <div id="client-event-identifier" v-if="matchedClient">
      <img :src="defaultProfilePicture" alt="" />
      <h5 id="client-name">
        {{ matchedClient.given_name }} <br />
        <span> {{ matchedClient.family_name }}</span>
      </h5>
    </div>
    <div class="event-location-identifier" v-if="primaryLocation">
      <h4 class="venue-name">{{ primaryLocation.name }}</h4>
      <div class="event-address">
        <p>{{ primaryLocation.address.streetAddress1 }}</p>
        <p v-if="primaryLocation.address.streetAddress2">
          {{ primaryLocation.address.streetAddress2 }}
        </p>
        <p>{{ primaryLocation.address.cityStateZip }}</p>
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
import defaultProfilePicture from "../../assets/default-profile-picture.svg";
import helpers from "../../helpers.js";

export default {
  data() {
    return {
      defaultProfilePicture,
      loading: true,
      primaryLocation: undefined,
      matchedClient: undefined,
    };
  },
  methods: {
    formatDate: helpers.formatDate,
    formatTime: helpers.formatTime,
    formatPrice: helpers.formatPrice,
    balanceOutstanding: helpers.balanceOutstanding,
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch("getLocation", this.event.locations[0]).then((res) => {
      if (res.Item) {
        this.primaryLocation = res.Item;
      }
    });
    this.$store.dispatch("getUser", this.event.contacts[0]).then((res) => {
      this.matchedClient = res.Item;
    });
    this.loading = false;
  },
  props: ["event", "first"],
};
</script>

<style scoped>
#client-event-identifier,
#event-location-identifier,
#event-metadata-identifier {
  display: flex;
  max-width: 33%;
  width: 33%;
}
.single-event-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--cardOutline);
  cursor: pointer;
}

#client-event-identifier {
  flex-direction: row;
  align-items: center;
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

#event-metadata-identifier {
  flex-direction: column;
  font-size: 10pt;
  text-align: right;
}
</style>