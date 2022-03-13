<template>
  <div class="single-event-item" v-if="!loading" @click="eventClicked">
    <div class="client-event-identifier" v-if="client">
      <profile-picture
        contact="person"
        :profilePicture="client.profilePicture"
        :customStyle="profilePictureStyling"
      />
      <h5 class="client-name" v-if="client.username">
        {{ client.given_name }} <br />
        <span> {{ client.family_name }}</span>
      </h5>
    </div>
    <div class="event-location-identifier">
      <h4 class="venue-name" v-if="location.name">
        {{ location.name }}
      </h4>
      <div class="event-address" v-if="location.address">
        <p>{{ location.address.streetAddress1 }}</p>
        <!-- <p v-if="location.address.streetAddress2">
          {{ location.address.streetAddress2 }}
        </p> -->
        <p>{{ location.address.cityStateZip }}</p>
      </div>
    </div>
    <div class="event-location-identifier" v-if="!location">
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
  <skeleton-card v-if="loading" />
</template>

<script>
import ProfilePicture from "../../assets/ProfilePicture.vue";
import SkeletonCard from "../SharedComponentsUI/SkeletonCards/SkeletonThreeSectionUpcomingEventListItem.vue";
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
    client() {
      return this.event.contacts[0];
    },
    location() {
      return this.event.locations[0];
    },
    loading() {
      if (this.loaded) {
        return false;
      } else if (!this.client.userId) {
        return true;
      } else if (!this.location.name) {
        return true;
      } else {
        return false;
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
  components: { ProfilePicture, SkeletonCard },
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