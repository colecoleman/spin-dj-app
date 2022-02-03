<template>
  <div>
    <p class="bold" v-if="conversations.length <= 0">
      No message threads found! Start one!
    </p>
    <recent-messages-person-object
      v-for="conversation in sortedMessages"
      :key="conversation.pk"
      :conversation="conversation"
      @click="openSingleMessaging(conversation)"
    />
  </div>
</template>
<script>
import RecentMessagesPersonObject from "./RecentMessagesPersonObject.vue";

export default {
  sortedConversations: [],
  computed: {
    sortedMessages() {
      if (this.conversations.length > 0) {
        let conversations = [...this.conversations];
        conversations.sort((a, b) => {
          this.findMostRecentMessage(a) < this.findMostRecentMessage(b)
            ? 1
            : this.findMostRecentMessage(a) > this.findMostRecentMessage(b)
            ? -1
            : 0;
        });
        return conversations;
      } else {
        return [];
      }
    },
  },
  methods: {
    openSingleMessaging(conversation) {
      this.$emit("open-single-messaging", conversation);
    },
    findMostRecentMessage(conversation) {
      conversation.thread.sort((a, b) => {
        return a.data.sentDate < b.data.sentDate
          ? 1
          : a.data.sentDate > b.data.sentDate
          ? -1
          : 0;
      });
      return conversation.thread[0].data.sentDate;
      // return conversation;
    },
  },

  components: {
    RecentMessagesPersonObject,
  },
  props: ["conversations", "currentUser"],
};
</script>
<style scoped>
</style>