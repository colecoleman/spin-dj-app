<template>
  <popup-email-composition
    v-if="popupOpen === 'send-email'"
    :contact="contact"
    @close-window="togglePopup"
  />
  <contact-page-reset-password
    :contact="contact"
    @toggle-popup="togglePopup"
    v-if="popupOpen === 'reset-password'"
  />
  <contact-page-delete-contact
    :contact="contact"
    @toggle-popup="togglePopup"
    v-if="popupOpen === 'delete'"
  />

  <section>
    <div id="contact-card">
      <contact-card-client
        :loading="contact ? false : true"
        :contact="contact"
        :icon="SVGs.PersonSVG"
        @email-contact="togglePopup('send-email')"
      />
    </div>
    <div id="to-do">
      <contact-page-to-do-list :contact="contact" />
    </div>
    <div id="notes">
      <contact-page-notes
        :contact="contact"
        :notesPrivate="contact.notesPrivate"
        :notesPublic="contact.notesPublic"
        v-if="contact"
      />
    </div>

    <div id="button-bar">
      <four-button-bar-with-drop-down
        :buttons="buttons"
        :dropdown="dropdown"
        @button-clicked="togglePopup"
        @dropdown-button-clicked="togglePopup"
      />
    </div>

    <div id="upcoming-events">
      <client-page-upcoming-events
        :contact="contact"
        :icon="SVGs.CalendarSVG"
      />
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
      />
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
import ContactPageDeleteContact from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageDeleteContact.vue";
// import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ClientPageUpcomingEvents from "../../AdminComponents/AdminContactPageComponents/ClientPageComponents/ClientPageUpcomingEvents.vue";
import ContactPageResetPassword from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageResetPassword.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import SVGs from "../../../../assets/SVGs/svgIndex.js";
// import TwoButtonDialogModal from "../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";

export default {
  data() {
    return {
      SVGs,
      automations: [],
      contact: undefined,
      thread: undefined,
      conversation: undefined,

      eventConversation: [],
      popupOpen: null,
      buttons: [
        {
          title: "Send Email",
          parameter: "send-email",
        },
      ],
      dropdown: {
        title: "Actions",
        actionItems: [
          {
            title: "Email",
            parameter: "send-email",
            icon: SVGs.EmailSVG,
          },
          {
            title: "Reset Password",
            parameter: "reset-password",
            icon: SVGs.KeySVG,
          },
          {
            title: "delete",
            danger: true,
            parameter: "delete",
            icon: SVGs.TrashCanSVG,
          },
        ],
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    togglePopup(popup) {
      if (this.popupOpen !== null) {
        this.popupOpen = null;
      } else {
        this.popupOpen = popup;
      }
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
    ContactPageResetPassword,
    // TwoButtonDialogModal,
    ContactPageDeleteContact,
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
  grid-template-columns: minmax(100px, 250px) repeat(8, 1fr);
  grid-template-rows: 75px minmax(30px, 50px) repeat(7, 1fr);
  gap: 10px;
}

#contact-card {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
#to-do {
  grid-column: 1 / 3;
  grid-row: 3 / 6;
}

#notes {
  grid-column: 1 / 3;
  grid-row: 6 / 10;
}
#messages {
  grid-column: 7/10;
  grid-row: 6/ 10;
}

#button-bar {
  grid-column: 3/ 10;
  grid-row: 1/ 2;
}

#upcoming-events {
  grid-column: 3/ 7;
  grid-row: 2/10;
}

#automation {
  grid-column: 7 / 10;
  grid-row: 2/ 6;
}
</style>
