<template>
  <div class="message-item">
    <div :class="sentByUser() ? 'user-message message-body' : 'message-body'">
      <p>{{ message.body }}</p>
    </div>
    <p v-if="sentByUser() && message.read" class="read-note">
      Read at
      {{
        new Date(message.read).toLocaleDateString("lookup", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      }}
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    sentByUser() {
      return this.message.senderKey.userId === this.$store.state.user.userId;
    },
  },
  created() {},
  components: {},
  props: ["message"],
};
</script>
<style scoped>
.message-item {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.message-body {
  max-width: 60%;
  width: fit-content;
  text-align: left;
  filter: drop-shadow(0px 1px 1px var(--cardOutline));
  background-color: var(--foregroundColor);
  padding: 10px;
  border-radius: 20px 20px 20px 0;
  margin: 5px;
}

.user-message {
  margin-left: auto;
  background-color: #bcffed;
  border-radius: 20px 20px 0px 20px;
  align-self: right;
}

.read-note {
  /* width: fit-content; */
  text-align: right;
  margin: 0;
  font-size: 8px;
}
</style>