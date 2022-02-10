<template>
  <div id="single-event-item">
    <div id="client-event-identifier" v-if="matchedClient">
      <img :src="defaultProfilePicture" alt="" />
      <h5 id="client-name">
        {{ matchedClient.given_name }} <br />
        <span> {{ matchedClient.family_name }}</span>
      </h5>
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
      matchedClient: undefined,
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

    this.$store.dispatch("getUser", this.event.contacts[0]).then((res) => {
      this.matchedClient = res.Item;
    });
    this.loading = false;
  },
  props: ["event"],
};
</script>

<style scoped>
#client-event-identifier,
#event-metadata-identifier {
  display: flex;
  max-width: 50%;
  width: 50%;
}
#single-event-item {
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  cursor: pointer;
}

#client-event-identifier {
  flex-direction: row;
  align-items: center;
}

#client-event-identifier img {
  height: 40px;
  width: 40px;
  margin: 10px 10px 10px 0;
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