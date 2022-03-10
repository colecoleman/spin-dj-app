<template>
  <div class="single-event-item" v-if="event" :class="loading ? loading : ''">
    <div class="client-event-identifier" v-if="matchedClient">
      <profile-picture
        contact="person"
        :profilePicture="matchedClient.profilePicture"
        :customStyle="profilePictureStyling"
      />
      <h5 class="client-name" v-if="matchedClient">
        {{ matchedClient.given_name }} <br />
        <span> {{ matchedClient.family_name }}</span>
      </h5>
      <h5 class="client-name" v-if="!matchedClient">
        Unknown<br />
        <span>User</span>
      </h5>
    </div>
    <div class="event-location-identifier" v-if="primaryLocation">
      <h4 class="venue-name">{{ primaryLocation.name }}</h4>
      <div class="event-address">
        <p>{{ primaryLocation.address.streetAddress1 }}</p>
        <!-- <p v-if="primaryLocation.address.streetAddress2">
          {{ primaryLocation.address.streetAddress2 }}
        </p> -->
        <p>{{ primaryLocation.address.cityStateZip }}</p>
      </div>
    </div>
    <div class="event-location-identifier" v-if="!primaryLocation">
      <h4>Unknown Location</h4>
    </div>
    <div class="event-metadata-identifier">
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
  </div>
</template>

<script>
import ProfilePicture from "../../assets/ProfilePicture.vue";
import {
  formatDate,
  formatTime,
  formatPrice,
  balanceOutstanding,
} from "../../helpers.js";

export default {
  data() {
    return {
      profilePictureStyling: "height: 30px; width: 30px; margin: 5px;",
      loading: true,
      primaryLocation: undefined,
      matchedClient: undefined,
    };
  },
  computed: {
    userRole() {
      let user = this.$store.state.user;
      if (user.tenantId === user.userId) {
        return "admin";
      } else {
        return user.role;
      }
    },
  },
  methods: {
    formatDate,
    formatTime,
    formatPrice,
    balanceOutstanding,
  },
  mounted() {
    this.loading = true;
    if (this.event.locations) {
      this.$store
        .dispatch("getLocation", this.event.locations[0])
        .then((res) => {
          if (res.Item) {
            this.primaryLocation = res.Item;
          }
        });
    }
    if (this.event.contacts.length > 0) {
      this.$store.dispatch("getUser", this.event.contacts[0].id).then((res) => {
        this.matchedClient = res;
      });
    }
  },
  props: ["event", "first"],
  components: { ProfilePicture },
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  .client-event-identifier,
  .event-location-identifier,
  .event-metadata-identifier {
    display: flex;
    height: 70px;
    max-width: 33%;
    width: 33%;
  }
  .single-event-item {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--cardOutline);
    cursor: pointer;
  }

  .client-event-identifier {
    flex-direction: row;
    align-items: center;
  }

  .client-name {
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