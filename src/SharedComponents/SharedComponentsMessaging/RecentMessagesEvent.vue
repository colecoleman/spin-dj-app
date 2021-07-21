<template>
  <base-card :icon="svg.messageBubble">
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
import messageBubble from "../../assets/SVGs/message-bubble.svg";

export default {
  data() {
    return {
      svg: {
        messageBubble,
      },
    };
  },
  components: {
    RecentMessagesPersonObject,
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