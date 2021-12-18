<template>
  <base-card
    :icon="SVGs.MessageBubbleSVG"
    :actionIcon="
      openView === 'single'
        ? SVGs.XIconSVG
        : openView === 'default' && useRole === 'admin'
        ? SVGs.PlusSignSVG
        : ''
    "
    @action-one-clicked="
      openView === 'single' ? closeSingleMessaging() : addConversationClicked()
    "
  >
    <template v-slot:title>Messages</template>
    <template v-slot:action1> </template>
    <template v-slot:content>
      <div id="container">
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
      var promises = conversation.users.map((x) => {
        return this.$store
          .dispatch("nonAdminGetUser", x)
          .then((res) => {
            return res.data.Item;
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
  async created() {
    let userConversations = [...new Set(this.currentUser.conversations)];
    Promise.all(this.getConversations(userConversations)).then((res) => {
      console.log(res);
      let conversations = res[0];
      for (let index = 0; index < conversations.length; index++) {
        console.log(conversations[index]);
        Promise.all([
          this.getConversationUsers(conversations[index]),
          this.getConversationMessages(conversations[index]),
        ]).then((res) => {
          let conversation = {
            ...conversations[index],
            thread: res[1],
            users: res[0],
          };
          console.log(conversations);
          this.conversations.push(conversation);
          console.log(this.conversations);
        });
      }
    });
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