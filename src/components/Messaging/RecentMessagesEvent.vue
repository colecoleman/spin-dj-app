<template>
  <base-card>
    <template v-slot:icon
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="14.993"
        viewBox="0 0 16 14.993"
      >
        <path
          id="Icon_metro-bubble"
          data-name="Icon metro-bubble"
          d="M10.571,3.856c4.418,0,8,2.91,8,6.5s-3.582,6.5-8,6.5a9.881,9.881,0,0,1-1.247-.079,7.791,7.791,0,0,1-5.753,2.072v-.421a3.183,3.183,0,0,0,2-2.572,3.018,3.018,0,0,0-.034-.448,6.119,6.119,0,0,1-2.966-5.052c0-3.59,3.582-6.5,8-6.5Z"
          transform="translate(-2.571 -3.856)"
          fill="#fff"
        /></svg
    ></template>
    <template v-slot:title>Messages</template>
    <template v-slot:content
      ><div id="container">
        <recent-messages-person-object
          v-for="client in clients"
          :key="client.id"
          :firstName="client.firstName"
          :lastName="client.lastName"
          :profilePicture="client.profilePicture"
          :recentMessage="client.recentMessage"
        >
        </recent-messages-person-object></div
    ></template>
  </base-card>
</template>

<script>
import RecentMessagesPersonObject from "./RecentMessagesPersonObject.vue";
import BaseCard from "../UI/BaseCard.vue";

export default {
  components: {
    RecentMessagesPersonObject,
    BaseCard,
  },
  computed: {
    clients() {
      return this.$store.state.contacts.clients;
    },
  },
};
</script>

<style scoped>
#container {
  height: 100%;
  width: 100%;
  overflow: scroll;
}
</style>