<template>
  <div class="single-day-item">
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
        <p>{{ matchedClient.firstName }}</p>
        <p>{{ matchedClient.lastName }}</p>
      </div>
    </div>
    <div class="quick-info">
      <p class="venue-name">
        <b>{{ event.eventLocations[0].venueName }}</b>
      </p>
      <p>
        {{
          event.eventStartTime.toLocaleTimeString("lookup", {
            hour: "numeric",
            minute: "numeric",
          })
        }}
        -
        {{
          event.eventEndTime.toLocaleTimeString("lookup", {
            hour: "numeric",
            minute: "numeric",
          })
        }}
      </p>
    </div>
  </div>
</template>

<script>
import defaultProfilePicture from "../../../assets/default-profile-picture.svg";
export default {
  data() {
    return {
      defaultProfilePicture,
    };
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