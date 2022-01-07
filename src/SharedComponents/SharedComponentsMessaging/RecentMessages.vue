<template>
  <base-card
    :icon="SVGs.MessageBubbleSVG"
    title="Messages"
    :actionIcon="
      openView === 'single'
        ? SVGs.XIconSVG
        : openView === 'default' && userRole === 'admin'
        ? SVGs.PlusSignSVG
        : ''
    "
    @action-one-clicked="
      openView === 'single' ? closeSingleMessaging() : addConversationClicked()
    "
  >
    <template v-slot:action1> </template>
    <template v-slot:content>
      <div id="container" v-if="loaded">
        <div class="conditional-wrapper" v-if="openView === 'single'">
          <messaging-single-component
            :conversation="singleMessagingConversation"
          ></messaging-single-component>
        </div>
        <div class="conditional-wrapper" v-if="openView === 'default'">
          <messaging-thread-list
            :conversations="conversations"
            :currentUser="currentUser"
            @open-single-messaging="openSingleMessaging"
          ></messaging-thread-list>
        </div>
        <div class="conditional-wrapper" v-if="openView === 'search'">
          <messaging-contact-search
            @contact-selected="openSingleMessaging"
          ></messaging-contact-search>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import MessagingSingleComponent from "./MessagingSingleComponent.vue";
import SVGs from "../../assets/SVGs/svgIndex.js";
import MessagingContactSearch from "./MessagingContactSearch.vue";
import MessagingThreadList from "./MessagingThreadList.vue";
export default {
  data() {
    return {
      SVGs,
      loaded: false,
      singleMessagingConversation: undefined,
      openView: "default",
      conversations: [],
    };
  },
  components: {
    MessagingSingleComponent,
    MessagingContactSearch,
    MessagingThreadList,
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    userRole() {
      let user = this.$store.state.user;
      if (user.tenantId === user.userId) {
        return "admin";
      } else {
        return user.role;
      }
    },
    contacts() {
      let contactsArr = this.$store.state.contacts;
      let contacts = [
        ...contactsArr.clients,
        ...contactsArr.vendors,
        ...contactsArr.organizers,
        ...contactsArr.employees,
      ];
      return contacts;
    },
  },
  methods: {
    openSingleMessaging(conversation) {
      this.singleMessagingConversation = conversation;
      this.openView = "single";
    },
    addConversationClicked() {
      this.openView = "search";
    },
    closeSingleMessaging() {
      this.openView = "default";
    },
    getConversations(conversations) {
      return conversations.map((x) => {
        x = this.$store.dispatch("getThreadParticipants", x).then((res) => {
          return res.Items;
        });
        return x;
      });
    },
    async getConversationUsers(conversation) {
      conversation.users = conversation.users.filter((x) => {
        return x !== this.currentUser.userId;
      });
      var promises = conversation.users.map((x) => {
        let correctCall = this.currentUser.role ? "nonAdminGetUser" : "getUser";
        return this.$store
          .dispatch(correctCall, x)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      });
      let users;
      return Promise.all(promises).then((res) => {
        users = res;
        return users;
      });
    },
    async getConversationMessages(conversation) {
      let thread = await this.$store
        .dispatch("getMessageThread", conversation.pk)
        .then((res) => {
          res.Items;
          return res.Items;
        });
      return thread;
    },
  },
  props: ["conversationList"],
  async created() {
    Promise.all(this.getConversations(this.conversationList)).then((res) => {
      let conversations = res;
      for (let index = 0; index < conversations.length; index++) {
        Promise.all([
          this.getConversationUsers(...conversations[index]),
          this.getConversationMessages(...conversations[index]),
        ]).then((res) => {
          let conversation = {
            ...conversations[index],
            thread: res[1],
            users: res[0],
          };
          this.conversations.push(conversation);
        });
      }
    });
    this.loaded = true;
  },
};
</script>

<style scoped>
#container {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  /* display: flex; */
  /* overflow-x: hidden; */
  overflow-y: scroll;
  /* margin: auto; */
}

.conditional-wrapper {
  height: 100%;
}
</style>