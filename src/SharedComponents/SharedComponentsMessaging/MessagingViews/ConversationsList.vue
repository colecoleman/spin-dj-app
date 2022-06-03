<template>
  <div id="conversation-list-wrapper">
    <conversation-preview
      v-if="!conversations.length > 0"
      :key="defaultConversation.id"
      :conversation="defaultConversation"
    />
    <conversation-preview
      v-for="conversation in conversations"
      :key="conversation.id"
      :conversation="conversation"
      @click="conversationClicked(conversation.id)"
    ></conversation-preview>
  </div>
</template>
<script>
import ConversationPreview from "../MessagingComponents/ConversationPreview.vue";
export default {
  computed: {
    defaultConversation() {
      return {
        id: "default-conversation",
        sortKey: "default-conversation",
        participantKeys: [
          { userId: "system", tenantId: "system" },
          { userId: "system", tenantId: "system" },
        ],
        messages: {
          123456: {
            body: `You don't have any messages here yet. Find a contact to send one!`,
            senderKey: {
              userId: "system",
              tenantId: "system",
            },
          },
        },
      };
    },
  },
  methods: {
    conversationClicked(id) {
      this.$emit("conversation-selected", id);
    },
  },
  components: { ConversationPreview },
  props: ["conversations"],
  emits: ["conversation-selected"],
};
</script>
<style scoped>
#conversation-list-wrapper {
  height: 100%;
  overflow: scroll;
}
</style>