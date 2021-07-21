<template>
  <base-card :icon="messageBubble">
    <template v-slot:title>Messages</template>
    <template v-slot:action1>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        v-if="singleMessaging"
        @click="closeSingleMessaging()"
      >
        <path
          data-name="Icon metro-cancel"
          d="M9.571,1.928a7,7,0,1,0,7,7,7,7,0,0,0-7-7Zm0,12.688a5.688,5.688,0,1,1,5.688-5.688,5.688,5.688,0,0,1-5.688,5.688Zm2.188-9.188L9.571,7.616,7.383,5.428,6.071,6.741,8.258,8.928,6.071,11.116l1.313,1.312,2.187-2.187,2.188,2.188,1.313-1.312L10.883,8.928l2.188-2.188Z"
          transform="translate(-2.571 -1.928)"
          fill="#fff"
        />
      </svg>
    </template>
    <template v-slot:content>
      <messaging-single-component
        v-if="singleMessaging"
        :contact="singleMessagingContact"
        :id="singleMessaging"
      ></messaging-single-component>
      <div id="container" v-if="!singleMessaging">
        <recent-messages-person-object
          v-for="contact in contacts"
          :key="contact.id"
          :firstName="contact.firstName"
          :lastName="contact.lastName"
          :profilePicture="contact.profilePicture"
          :recentMessage="contact.recentMessage"
          @click="openSingleMessaging(contact, contact.id)"
        >
        </recent-messages-person-object>
      </div>
    </template>
  </base-card>
</template>

<script>
import RecentMessagesPersonObject from "./RecentMessagesPersonObject.vue";
import MessagingSingleComponent from "./MessagingSingleComponent.vue";

import messageBubble from "../../assets/SVGs/message-bubble.svg";
export default {
  data() {
    return {
      messageBubble,
      singleMessaging: undefined,
      singleMessagingContact: undefined,
    };
  },
  components: {
    MessagingSingleComponent,
    RecentMessagesPersonObject,
  },
  computed: {
    contacts() {
      return this.$store.state.contacts.clients;
    },
  },
  methods: {
    openSingleMessaging(contact, id) {
      this.singleMessagingContact = contact;
      this.singleMessaging = id;
    },
    closeSingleMessaging() {
      this.singleMessagingContact = undefined;
      this.singleMessaging = undefined;
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