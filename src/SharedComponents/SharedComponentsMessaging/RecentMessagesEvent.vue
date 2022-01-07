<template>
  <base-card :icon="SVGs.MessageBubbleSVG" title="Messages">
    <template v-slot:content
      ><div id="container">
        <message-thread-list
          :conversations="conversations"
          :currentUser="currentUser"
          @open-single-messaging="openSingleMessaging"
        >
        </message-thread-list></div
    ></template>
  </base-card>
</template>

<script>
import MessageThreadList from "./MessagingThreadList.vue";
import SVGs from "../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      singleMessagingConversation: undefined,
      openView: "default",
      conversations: [],
    };
  },
  components: {
    MessageThreadList,
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