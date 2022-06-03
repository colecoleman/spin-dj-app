<template>
  <div id="message-input-wrapper">
    <textarea
      class="message-input"
      v-model="messageBody"
      placeholder="Write a message..."
    />
    <round-icon-button
      :svg="conversationLoading ? 'loading' : 'up-arrow'"
      class="send-button"
      @click="sendMessage"
    />
  </div>
</template>
<script>
import RoundIconButton from "../../SharedComponentsUI/RoundIconButton.vue";
export default {
  data() {
    return {
      messageBody: undefined,
    };
  },
  methods: {
    sendMessage() {
      if (!this.conversationLoading) {
        this.$emit("send-message", this.messageBody);
        this.messageBody = undefined;
      }
    },
  },
  created() {},
  components: {
    RoundIconButton,
  },
  props: ["conversationLoading"],
  emits: ["send-message"],
};
</script>
<style scoped>
#message-input-wrapper {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding-top: 10px;
  max-height: 30%;
}

.message-input {
  /* height: 100%; */
  width: 100%;
  max-height: 100%;
  outline: none;
  border: none;
  filter: drop-shadow(0px 1px 1px var(--cardOutline));
  padding-left: 10px;
  resize: none;

  font-size: 12px;
}

.send-button {
  margin-right: 0;
}
</style>