<template>
  <base-card svg="message-bubble" title="Messages">
    <template v-slot:content
      ><div id="container">
        <message-thread-list
          :conversations="conversations"
          :currentUser="currentUser"
          @open-single-messaging="openSingleMessaging"
        /></div
    ></template>
  </base-card>
</template>

<script>
import MessageThreadList from "./MessagingThreadList.vue";

export default {
  data() {
    return {
      singleMessagingConversation: undefined,
      openView: "default",
      conversations: [],
    };
  },
  components: {
    MessageThreadList,
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    clients() {
      return this.$store.getters.clients();
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