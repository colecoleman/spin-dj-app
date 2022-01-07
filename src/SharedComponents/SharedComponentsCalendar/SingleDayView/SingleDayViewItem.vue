<template>
  <div class="single-day-item" v-if="!loading">
    <div class="client-identifier">
      <img
        :src="
          matchedClient.profilePicture
            ? matchedClient.profilePicture
            : defaultProfilePicture
        "
        alt=""
      />
      <div class="client-name">
        <p>{{ matchedClient.given_name }}</p>
        <p>{{ matchedClient.family_name }}</p>
      </div>
    </div>
    <div class="quick-info">
      <p class="venue-name" v-if="primaryLocation.name">
        <b>{{ primaryLocation.name }}</b>
      </p>
      <p>
        {{ formatTime(event.data.startTime) }}
        -
        {{ formatTime(event.data.endTime) }}
      </p>
    </div>
  </div>
</template>

<script>
import defaultProfilePicture from "../../../assets/default-profile-picture.svg";
import helpers from "../../../helpers.js";

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
    formatTime: helpers.formatTime,
  },
  created() {
    this.$store.dispatch("getUser", this.event.contacts[0]).then((res) => {
      this.matchedClient = res.Item;
      if (this.event.locations.length > 0) {
        this.$store
          .dispatch("getLocation", this.event.locations[0])
          .then((res) => {
            if (res.Item) {
              this.primaryLocation = res.Item;
            }
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    });
  },
  props: ["event"],
};
</script>

<style scoped>
.single-day-item {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.client-identifier {
  display: flex;
  flex-direction: row;
  align-items: center;
}
img {
  height: 30px;
  width: 30px;
  margin-right: 8px;
}

.client-name > p {
  text-align: left;
  margin: 0;
  font-weight: 600;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quick-info {
  display: flex;
  flex-direction: column;
  justify-content: right;
  text-align: right;
}

.quick-info > p {
  margin: 0;
}

.venue-name {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>