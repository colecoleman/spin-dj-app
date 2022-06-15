<template>
  <div class="conversation-wrapper">
    <div id="messages-wrapper" class="messages-wrapper" v-if="conversation">
      <div v-if="conversation.messages.length === 0">
        <div
          class="message"
          v-for="(message, index) in blankMessages"
          :key="index"
        >
          <message-sender-identifier
            v-if="displaySender(index, blankMessages)"
            :contactKey="message.senderKey"
          />
          <message :message="message" />
        </div>
      </div>
      <div
        class="message"
        :id="'message-' + index"
        v-for="(message, index) in messages"
        :key="message.id"
      >
        <message-sender-identifier
          v-if="displaySender(index, messages)"
          :contactKey="message.senderKey"
        />
        <message :message="message" />
      </div>
    </div>
    <message-input
      @send-message="sendMessage"
      :conversationLoading="conversationLoading"
    />
  </div>
</template>
<script>
import MessageInput from "../MessagingComponents/MessageInput.vue";
import Message from "../MessagingComponents/Message.vue";
import MessageSenderIdentifier from "../MessagingComponents/MessageSenderIdentifier.vue";
export default {
  data() {
    return {
      blankMessages: [
        {
          body: "There are no messages on this thread.",
          senderKey: {
            userId: "system",
            tenantId: "system",
          },
        },
        {
          body: "Send a new message to start one!",
          senderKey: {
            userId: "system",
            tenantId: "system",
          },
        },
      ],
    };
  },
  computed: {
    messages() {
      if (this.conversation) {
        return Object.values(this.conversation.messages);
      } else {
        return [];
      }
    },
  },
  methods: {
    displaySender(index, messages) {
      if (index !== 0) {
        return (
          messages[index - 1].senderKey.userId !==
          messages[index].senderKey.userId
        );
      } else {
        return true;
      }
    },
    sendMessage(body) {
      this.$emit("send-message", body);
    },
  },

  components: {
    MessageInput,
    Message,
    MessageSenderIdentifier,
  },
  props: ["conversation", "conversationLoading"],
  emits: ["send-message"],
};
</script>
<style scoped>
.conversation-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.messages-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  scroll-behavior: smooth;
}
.messages-wrapper .message:first-child {
  margin-top: auto;
}
</style>