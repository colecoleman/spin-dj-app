<template>
  <div id="messaging-wrapper">
    <div class="messages-container" v-if="conversation">
      <div
        v-for="(message, index) in messagesSortedByDate"
        :key="index"
        :class="
          message.data.author == currentUser.userId
            ? 'sent message'
            : 'received message'
        "
      >
        <p>{{ message.data.body }}</p>
      </div>
    </div>
    <div class="input-field">
      <input
        type="text"
        placeholder="Start typing..."
        v-model="messageInput"
        @keyup.enter="clickHandler()"
      />
      <vue-svg
        svg="circle-arrow-up"
        :customStyle="svgStyling"
        @clicked="clickHandler()"
      />
    </div>
  </div>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";

export default {
  data() {
    return {
      messageInput: undefined,
      svgStyling: "height: 20px; width: 20px; margin-left: 10px;",
      messages: [],
      thread: undefined,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    contact() {
      if (this.conversation) {
        return this.conversation.users[0];
      } else {
        return this.defaultUser;
      }
    },
    messagesSortedByDate() {
      if (this.conversation) {
        console.log(this.conversation);
        let tempArray = [...this.conversation.thread];
        return tempArray.sort(function (a, b) {
          return a.data.sentDate < b.data.sentDate
            ? 1
            : a.data.sentDate > b.data.sentDate
            ? -1
            : 0;
        });
      } else {
        return [];
      }
    },
  },
  methods: {
    async createThread() {
      let payload = {
        userId: this.$store.state.user.userId,
        users: [this.$store.state.user.userId, this.id],
        tenantId: this.$store.state.user.tenantId,
      };
      await this.$store
        .dispatch("createMessagingThread", payload)
        .then((res) => {
          this.thread = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async sendMessage() {
      let payload = {
        conversationId: this.thread ? this.thread : this.conversation.pk,
        data: {
          author: this.$store.state.user.userId,
          body: this.messageInput,
          sentDate: new Date().getTime(),
        },
      };
      await this.$store.dispatch("sendMessage", payload);
      this.messages.unshift(payload);
      this.messageInput = undefined;
    },
    async clickHandler() {
      if (
        (this.thread && this.messageInput) ||
        (this.conversation && this.messageInput)
      ) {
        await this.sendMessage();
      } else if (!this.thread && !this.conversation && this.messageInput) {
        await this.createThread();
        this.sendMessage();
      } else if (!this.messageInput) {
        this.$store.commit("addStatus", {
          type: "error",
          note: "Message Can't Be Empty",
        });
      }
    },
    navigateToEventPage(id) {
      this.$router.push("/contacts/clients/" + id);
    },
  },
  components: { VueSvg },
  props: ["id", "icon", "conversation", "defaultUser"],
};
</script>

<style scoped>
#messaging-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
}
#contact-identification {
  position: absolute;
  background-color: var(--foregroundColor);
  /* z-index: 2; */
  padding-right: 10px;
  top: -10px;
  border: 1px solid var(--cardOutline);
  border-top: 0;
  border-left: 0;
  border-radius: 0 0 10px 0;
  font-weight: 600;
  cursor: pointer;
}

.messages-container {
  height: 85%;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
}

.message {
  max-width: 60%;
  padding: 0px 15px;
  margin: 3px;
  text-align: left;
  font-size: 10pt;
}

.received {
  align-self: flex-start;
  background-color: aquamarine;
  color: black;
  border-radius: 10px 10px 10px 2px;
}

.sent {
  align-self: flex-end;
  background-color: var(--backgroundColor);
  color: var(--textColor);
  border: 1px solid var(--cardOutline);
  border-radius: 10px 10px 2px 10px;
}

.input-field {
  height: 15%;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: row;
}

input {
  width: 95%;
  border-radius: 10px;
  height: 20px;

  padding-left: 20px;
}

input:focus {
  outline: none;
}
</style>