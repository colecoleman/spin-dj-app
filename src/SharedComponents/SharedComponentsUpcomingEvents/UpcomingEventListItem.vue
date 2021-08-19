<template>
  <div id="single-event-item">
    <div id="client-event-identifier">
      <img :src="defaultProfilePicture" alt="" />
      <h5 id="client-name">
        {{ matchedClient.firstName }} <br />
        <span> {{ matchedClient.lastName }}</span>
      </h5>
    </div>
    <div class="event-location-identifier">
      <h4 class="venue-name">{{ primaryLocation.name }}</h4>
      <div class="event-address">
        <h5>{{ primaryLocation.address.address1 }}</h5>
        <h5>{{ primaryLocation.address.address2 }}</h5>
      </div>
    </div>
    <div id="event-metadata-identifier">
      <div id="date-and-time-identifier">
        <h5>{{ formatDate(event.eventStartTime) }}</h5>
        <h5>
          {{ formatTime(event.eventStartTime) }} -
          {{ formatTime(event.eventEndTime) }}
        </h5>
      </div>
      <div id="event-invoice-metadata">
        <p>
          ${{ (event.balanceOutstanding * 0.01).toLocaleString() }} Outstanding
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
    };
  },
  methods: {
    formatDate: helpers.formatDate,
    formatTime: helpers.formatTime,
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
    primaryLocation() {
      let locationId = this.event.eventLocations[0].locationId;

      console.log(
        this.$store.state.contacts.locations.find((x) => x.id === locationId)
      );

      return this.$store.state.contacts.locations.find(
        (x) => x.id === locationId
      );
    },
  },
  props: ["event"],
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
#single-event-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding-bottom: 20px;
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