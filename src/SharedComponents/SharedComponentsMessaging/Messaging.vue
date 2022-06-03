<template>
  <base-card
    :title="
      currentView === 'active-conversation' && this.display !== 'contact'
        ? `${activeConversationContact.given_name} ${activeConversationContact.family_name}`
        : 'Messaging'
    "
    svg="message-bubble"
    :searchIcon="
      currentView === 'conversations-list' || currentView === 'contact-search'
        ? 'plus-sign'
        : false
    "
    :searchProcessing="searchProcessing"
    :actionIcon="
      currentView === 'conversations-list' || display === 'contact'
        ? false
        : 'back-arrow'
    "
    @actionOneClicked="backButtonClicked"
    @search-icon-clicked="searchIconClicked"
    @search-input="updateSearchTerm"
    @search-blurred="searchBlurred"
  >
    <template v-slot:content>
      <active-conversation
        v-if="currentView === 'active-conversation'"
        :conversation="activeConversation"
        :conversationLoading="conversationLoading"
        @send-message="sendMessage"
      />
      <conversation-information />
      <conversations-list
        v-if="currentView === 'conversations-list'"
        :conversations="conversations"
        @conversation-selected="selectConversation"
      />
      <contact-search
        v-if="currentView === 'contact-search'"
        :searchTerm="contactSearchTerm"
        :restrictedContacts="contacts"
        @contact-selected="contactSelected"
      />
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
      currentView: undefined,
      messageActive: false,
      searchProcessing: false,
      contactSearchTerm: undefined,
      activeConversation: undefined,
      activeConversationContact: undefined,
      conversationLoading: true,
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.user.role;
    },
    conversations() {
      switch (this.display) {
        case "event":
          return this.$store.state.conversations
            .filter((x) => {
              let nonUserKeys = x.participantKeys.filter((x) => {
                return x.userId !== this.$store.getters.user.userId;
              });
              return (
                nonUserKeys.some((pk) => {
                  return this.contacts.some((contact) => {
                    return contact.userId === pk.userId;
                  });
                }) && Object.keys(x.messages).length > 0
              );
            })
            .sort(this.sortMessagesByTimeSent);
        case "contact":
          return [...this.$store.state.conversations].sort(
            this.sortMessagesByTimeSent
          );
        default:
          return this.$store.state.conversations
            .filter((x) => {
              return Object.keys(x.messages).length > 0;
            })
            .sort(this.sortMessagesByTimeSent);
      }
    },
  },
  methods: {
    sortMessagesByTimeSent(a, b) {
      return Math.max(...Object.keys(a.messages)) >
        Math.max(...Object.keys(b.messages))
        ? -1
        : 1;
    },
    searchBlurred() {
      setTimeout(() => {
        this.backButtonClicked();
      }, 300);
      this.contactSearchTerm = undefined;
    },
    updateSearchTerm(term) {
      this.contactSearchTerm = term;
    },
    searchIconClicked() {
      this.currentView = "contact-search";
    },
    backButtonClicked() {
      switch (this.currentView) {
        case "active-conversation":
          this.currentView = "conversations-list";
          break;
        case "contact-search":
          this.currentView = "conversations-list";
          break;
        default:
          break;
      }
      this.activeConversationContact = undefined;
      this.activeConversation = undefined;
    },
    async createNewConversation() {
      let contact = this.activeConversationContact;
      let currentUserKey = {
        userId: this.$store.state.user.userId,
        tenantId: this.$store.state.user.tenantId,
      };
      let contactKey = {
        userId: contact.userId,
        tenantId: contact.tenantId,
      };
      let activeConversation = {
        id: Date.now().toString(),
        sortKey: this.$store.state.user.userId,
        participantKeys: [currentUserKey, contactKey],
        messages: {},
      };
      this.activeConversation = activeConversation;
      await this.$store.dispatch("createNewConversation", activeConversation);
      this.conversationLoading = false;
      this.currentView = "active-conversation";
    },
    async contactSelected(contact) {
      this.activeConversationContact = await this.$store.dispatch(
        "getUser",
        contact.userId
      );
      if (this.activeConversationContact.conversations) {
        let matchingConversations =
          this.activeConversationContact.conversations.filter((x) => {
            return this.conversations.some((uc) => {
              return uc.id === x.id;
            });
          });
        if (matchingConversations.length > 0) {
          matchingConversations = await this.$store.dispatch(
            "getConversations",
            matchingConversations
          );
          let privateConversation = matchingConversations.find((x) => {
            return x.participantKeys.length === 2;
          });
          if (privateConversation) {
            this.activeConversation = privateConversation;
            this.conversationLoading = false;
            this.currentView = "active-conversation";
          } else {
            this.createNewConversation();
          }
        } else {
          this.createNewConversation();
        }
      } else {
        this.createNewConversation();
      }
    },
    async selectConversation(id) {
      this.activeConversation = this.$store.getters.getConversation(id);
      let subjectContact = this.activeConversation.participantKeys.find((x) => {
        return x.userId !== this.$store.state.user.userId;
      });
      this.activeConversationContact = await this.$store.dispatch(
        "getContactListItem",
        subjectContact
      );
      this.conversationLoading = false;
      this.currentView = "active-conversation";
      this.scrollConversationToBottom();
    },
    scrollConversationToBottom() {
      let element = document.getElementById("messages-wrapper");
      console.log(element);
      element.scrollTop = element.scrollHeight;
    },
    async sendMessage(body) {
      let message = {
        read: false,
        timeSent: Date.now(),
        timeRead: undefined,
        id: Date.now(),
        body: body,
        reaction: [],
        senderKey: {
          userId: this.$store.state.user.userId,
          tenantId: this.$store.state.user.tenantId,
        },
      };
      await this.$store.dispatch("sendMessage", {
        body: message,
        conversationKey: {
          id: this.activeConversation.id,
          sortKey: this.activeConversation.sortKey,
        },
      });
      this.scrollConversationToBottom();
    },
  },
  async created() {
    await this.$store.dispatch("getConversations");
    if (this.display === "contact") {
      await this.contactSelected(this.contact);
    } else {
      this.currentView = "conversations-list";
    }
  },
  components: {
    ActiveConversation,
    ConversationInformation,
    ConversationsList,
    ContactSearch,
  },
  props: ["display", "contacts", "contact"],
};
</script>
