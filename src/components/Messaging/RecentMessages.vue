<template>
  <base-card :icon="messageBubble">
    <template v-slot:title>Messages</template>
    <template v-slot:content>
      <div id="container">
        <recent-messages-person-object
          v-for="client in clients"
          :key="client.id"
          :firstName="client.firstName"
          :lastName="client.lastName"
          :profilePicture="client.profilePicture"
          :recentMessage="client.recentMessage"
        >
        </recent-messages-person-object>
      </div>
    </template>
  </base-card>
</template>

<script>
import RecentMessagesPersonObject from "./RecentMessagesPersonObject.vue";
import BaseCard from "../UI/BaseCard.vue";
import messageBubble from "../../assets/SVGs/message-bubble.svg";
export default {
  data() {
    return {
      messageBubble,
    };
  },
  components: {
    RecentMessagesPersonObject,
    BaseCard,
  },
  computed: {
    clients() {
      return this.$store.state.contacts.clients;
    },
  },
};
</script>

<style scoped>
#heading {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  align-self: flex-start;
}

h4 {
  font-weight: 600;
  text-transform: uppercase;
}

svg {
  margin: 5px;
}

#container {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: auto;
}
</style>