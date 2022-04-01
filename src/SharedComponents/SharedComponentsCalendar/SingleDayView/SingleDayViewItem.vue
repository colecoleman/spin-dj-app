<template>
  <div class="single-day-item" v-if="!loading">
    <div class="client-identifier">
      <profile-picture
        :profilePicture="matchedClient.profilePicture"
        contact="person"
        :customStyle="defaultProfileStyling"
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
import ProfilePicture from "../../../assets/ProfilePicture.vue";
import { formatTime } from "../../../helpers.js";

export default {
  data() {
    return {
      defaultProfileStyling: "height: 30px; width: 30px; margin-right: 8px;",
      loading: true,
      primaryLocation: undefined,
      matchedClient: undefined,
    };
  },
  methods: {
    formatTime,
  },

  props: ["event"],
  components: { ProfilePicture },
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