<template>
  <div id="messaging-wrapper">
    <div id="contact-identification">
      <p @click="navigateToEventPage(contact.userId)">
        {{ contact.given_name + " " + contact.family_name }}
      </p>
    </div>
    <div class="messages-container">
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
      <img :src="circleArrowUp" alt="" @click="clickHandler()" />
    </div>
  </div>
</template>

<script>
import circleArrowUp from "../../assets/SVGs/circle-arrow-up.svg";

export default {
  data() {
    return {
      messageInput: undefined,
      messages: [],
      thread: undefined,
      circleArrowUp,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    messagesSortedByDate() {
      let tempArray = [...this.messages];
      console.log(tempArray);
      return tempArray.sort(function (a, b) {
        return a.data.sentDate < b.data.sentDate
          ? 1
          : a.data.sentDate > b.data.sentDate
          ? -1
          : 0;
      });
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
        conversationId: this.thread ? this.thread : this.contact.conversation,
        data: {
          author: this.$store.state.user.userId,
          body: this.messageInput,
          sentDate: new Date().getTime(),
        },
      };
      console.log(payload);
      await this.$store.dispatch("sendMessage", payload);
      this.messages.unshift(payload);
      this.messageInput = undefined;
    },
    async clickHandler() {
      if (
        (this.thread && this.messageInput) ||
        (this.contact.conversation && this.messageInput)
      ) {
        await this.sendMessage();
      } else if (
        !this.thread &&
        !this.contact.conversation &&
        this.messageInput
      ) {
        await this.createThread();
        this.sendMessage();
      } else if (!this.messageInput) {
        this.$store.dispatch("addError", "Message Can't Be Empty");
      }
    },
    navigateToEventPage(id) {
      this.$router.push("/contacts/clients/" + id);
    },
  },
  props: ["contact", "id", "icon"],
  async created() {
    // console.log(this.contact);
    // if (this.contact.conversation) {
    //   await this.$store
    //     .dispatch("getMessageThread", this.contact.conversation)
    //     .then((res) => {
    //       console.log(res.Items);
    //       this.messages = [...res.Items];
    //     });
    //   return;
    // }
    // let userConversations;
    // let contactConversations;
    // if (this.$store.state.user.conversations) {
    //   userConversations = [...this.$store.state.user.conversations];
    // }
    // if (this.contact.conversations) {
    //   contactConversations = [...this.contact.conversations];
    // }
    // console.log(contactConversations);
    // console.log(userConversations);
    // if (contactConversations && userConversations) {
    //   this.thread = userConversations.find((x) => {
    //     return contactConversations.includes(x);
    //   });
    //   await this.$store
    //     .dispatch("getMessageThread", this.thread)
    //     .then((res) => {
    //       console.log(res.Items);
    //       this.messages = [...res.Items];
    //     });
    //   console.log(this.messages);
    //   console.log(this.currentUser);
    // }
  },
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

img {
  height: 20px;
  width: 20px;
  margin-left: 10px;
}
</style>