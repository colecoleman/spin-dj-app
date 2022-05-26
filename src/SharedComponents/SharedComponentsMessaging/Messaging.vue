<template>
  <base-card
    :title="messageActive ? 'placeholder' : 'Messaging'"
    svg="message-bubble"
    searchIcon="plus-sign"
  >
    <template v-slot:content>
      <active-conversation v-if="currentView === 'conversations-list'" />
      <conversation-information />
      <conversations-list />
      <contact-search />
    </template>
  </base-card>
</template>
<script>
import ActiveConversation from "./MessagingViews/ActiveConversation.vue";
import ConversationInformation from "./MessagingViews/ConversationInformation.vue";
import ConversationsList from "./MessagingViews/ConversationsList.vue";
import ContactSearch from "./MessagingViews/MessagingContactSearch.vue";
export default {
  data() {
    return {
      currentView: "conversations-list",
      messageActive: false,
    };
  },
  methods: {},
  created() {},
  components: {
    ActiveConversation,
    ConversationInformation,
    ConversationsList,
    ContactSearch,
  },
  props: [],
};
</script>
<style scoped>
</style>