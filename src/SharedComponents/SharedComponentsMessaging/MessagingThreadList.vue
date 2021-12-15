<template>
  <div>
    <h5 v-if="conversations.length <= 0">
      No message threads found! Start one!
    </h5>
    <recent-messages-person-object
      v-for="conversation in conversations"
      :key="conversation.conversation"
      :conversationId="conversation.conversation"
      :person="conversation"
      @click="openSingleMessaging(conversation)"
    >
    </recent-messages-person-object>
  </div>
</template>
<script>
import RecentMessagesPersonObject from "./RecentMessagesPersonObject.vue";

export default {
  computed: {
  },
  methods: {
    openSingleMessaging(conversation) {
      this.$emit("open-single-messaging", conversation);
    },
  },
  created() {},
  components: {
    RecentMessagesPersonObject,
  },
  props: ["contacts", "conversations", "currentUser"],
};
</script>
<style scoped>
</style>