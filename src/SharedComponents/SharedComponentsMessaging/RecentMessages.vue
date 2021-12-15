<template>
  <base-card
    :icon="SVGs.MessageBubbleSVG"
    :actionIcon="
      openView === 'single'
        ? SVGs.XIconSVG
        : openView === 'default'
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
            :contact="singleMessagingContact"
            :id="singleMessagingContact.userId"
          ></messaging-single-component>
        </div>
        <div class="conditional-wrapper" v-if="openView === 'default'">
          <messaging-thread-list
            :contacts="[...contacts]"
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
      singleMessagingContact: undefined,
      openView: "default",
      // conversations: [],
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
    conversations() {
      let contactsWithConversations = [...this.contacts].filter((x) => {
        return x.conversations ? true : false;
      });
      console.log(contactsWithConversations);
      let matchedItems = contactsWithConversations.filter((x) => {
        return this.currentUser.conversations.filter((i) => {
          return x.conversations.includes(i);
        });
      });

      let temp = matchedItems.map((x) => {
        let matchedConversation;
        matchedConversation = x.conversations.find((x) => {
          return this.currentUser.conversations.filter((i) => {
            return i == x;
          });
        });
        x.conversation = matchedConversation;
        delete x.conversations;
        return x;
      });
      console.log(temp);
      // temp.map((x) => {
      //   this.getMessageThread(x.conversation).then((res) => {
      //     x.conversation = res;
      //   });
      // });

      return temp;
    },
  },
  methods: {
    openSingleMessaging(contact) {
      this.singleMessagingContact = contact;
      this.openView = "single";
    },
    addConversationClicked() {
      this.openView = "search";
    },
    closeSingleMessaging() {
      this.openView = "default";
    },
    getMessageThread(id) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch("getMessageThread", id).then(
          (result) => {
            resolve(result.Items);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
  },
  // created() {
  //   let contactsWithConversations = [...this.contacts].filter((x) => {
  //     return x.conversations ? true : false;
  //   });
  //   let matchedItems = contactsWithConversations.filter((x) => {
  //     return this.currentUser.conversations.filter((i) => {
  //       return x.conversations.includes(i);
  //     });
  //   });

  //   this.conversations = matchedItems.map((x) => {
  //     let matchedConversation;
  //     matchedConversation = x.conversations.find((e) => {
  //       return this.currentUser.conversations.filter((i) => {
  //         return i == e;
  //       });
  //     });
  //     this.getMessageThread(matchedConversation).then((res) => {
  //       x.conversation = res;
  //     });
  //     return x;
  //   });

  //   // this.conversations = [temp];
  //   console.log(this.conversations);
  // },
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