<template>
  <popup-email-composition
    v-if="emailPopupOpen"
    :contact="contact"
    @close-window="closePopups()"
  ></popup-email-composition>
  <section>
    <div id="contact-card">
      <contact-card-client
        :loading="contact ? false : true"
        :contact="contact"
        :icon="SVGs.PersonSVG"
      ></contact-card-client>
    </div>
    <div id="to-do">
      <contact-page-to-do-list :contact="contact"></contact-page-to-do-list>
    </div>
    <div id="notes">
      <contact-page-notes
        :contact="contact"
        :notesPrivate="contact.notesPrivate"
        :notesPublic="contact.notesPublic"
        v-if="contact"
      ></contact-page-notes>
    </div>

    <div id="button-bar">
      <four-button-bar-with-drop-down
        :buttons="buttons"
        :dropdown="dropdown"
      ></four-button-bar-with-drop-down>
    </div>

    <div id="upcoming-events">
      <client-page-upcoming-events
        :contact="contact"
        :icon="SVGs.CalendarSVG"
      ></client-page-upcoming-events>
    </div>
    <!-- <div id="box-five-half-two">
          <client-page-information-card
            :contact="contact"
            :icon="SVGs.InformationIconSVG"
          ></client-page-information-card>
        </div> -->
    <div id="automation">
      <automation-list
        :automations="automations"
        :contacts="[contact]"
        automationType="Contact"
        :id="$route.params.id"
      ></automation-list>
    </div>
    <div id="messages">
      <base-card
        :icon="SVGs.MessageBubbleSVG"
        :loading="contact ? false : true"
        title="Coming Soon"
      >
        <template v-slot:content>
          <!-- <messaging-single-component
            v-if="conversation"
            :contact="contact"
            :conversation="conversation"
          ></messaging-single-component> -->
        </template>
      </base-card>
    </div>
  </section>
</template>

<script>
import ContactPageToDoList from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageToDoList.vue";
import AutomationList from "../../AdminComponents/AdminSharedComponents/AutomationList.vue";
import ContactCardClient from "../../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
// import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ClientPageUpcomingEvents from "../../AdminComponents/AdminContactPageComponents/ClientPageComponents/ClientPageUpcomingEvents.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import SVGs from "../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      automations: [],
      contact: undefined,
      thread: undefined,
      conversation: undefined,
      eventConversation: [],
      buttons: [
        {
          title: "Send Email",
          action: this.openEmailComposition,
          icon: SVGs.EmailSVG,
        },
      ],
      dropdown: {
        title: "Actions",
        actionItems: [
          {
            title: "Email",
            action: this.openEmailComposition,
            icon: SVGs.EmailSVG,
          },
          {
            title: "Reset Password",
            action: this.resetPassword,
            icon: SVGs.KeySVG,
          },
        ],
      },
      emailPopupOpen: false,
      notesPopupOpen: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    openEmailComposition() {
      this.emailPopupOpen = true;
    },
    closePopups() {
      this.emailPopupOpen = false;
      this.notesPopupOpen = false;
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
  async created() {
    await this.$store
      .dispatch("adminGetContact", this.$route.params.id)
      .then((res) => {
        this.contact = res.data.Item;
        if (this.contact.conversations) {
          let matchedItem = this.contact.conversations.find((x) => {
            return this.currentUser.conversations.includes(x);
          });
          if (matchedItem) {
            this.eventConversation.push(matchedItem);
          }
        }
      });
    if (this.eventConversation) {
      Promise.all(this.getConversations(this.eventConversation)).then((res) => {
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
            this.conversation = conversation;
          });
        }
      });
    }
  },
  components: {
    PopupEmailComposition,
    ContactCardClient,
    ContactPageToDoList,
    ClientPageUpcomingEvents,
    // ClientPageInformationCard,
    AutomationList,
    // MessagingSingleComponent,
    ContactPageNotes,
    FourButtonBarWithDropDown,
  },
};
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(20, 5%);
}

#contact-card {
  grid-column: 1 / 4;
  grid-row: 1 / 5;
}
#to-do {
  grid-column: 1 / 4;
  grid-row: 5 / 12;
}

#notes {
  grid-column: 1 / 4;
  grid-row: 12 / 21;
}
#messages {
  grid-column: 8/11;
  grid-row: 14/ 21;
}

#button-bar {
  grid-column: 4/ 11;
  grid-row: 1/ 4;
}

#upcoming-events {
  grid-column: 4/ 8;
  grid-row: 4/21;
}

#automation {
  grid-column: 8 / 11;
  grid-row: 4/ 14;
}
</style>