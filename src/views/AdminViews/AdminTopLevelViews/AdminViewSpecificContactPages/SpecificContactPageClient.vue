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

  <section v-if="contact">
    <div id="contact-card">
      <contact-card-client
        :contact="contact"
        svg="person"
        @email-contact="togglePopup('send-email')"
      />
    </div>
    <div id="to-do">
      <to-do-list :contact="contact" listType="contact" />
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
      <client-page-upcoming-events :contact="contact" svg="calendar" />
    </div>
    <!-- <div id="box-five-half-two">
          <client-page-information-card
            :contact="contact"
            svg="info"
          ></client-page-information-card>
        </div> -->
    <div id="automation">
      <automation-list
        :events="events"
        :contact="contact"
        automationType="Contact"
        :id="$route.params.id"
      />
    </div>
    <div id="messages">
      <base-card
        svg="message-bubble"
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
import ToDoList from "../../../../SharedComponents/SharedComponentsToDoList/ToDoList.vue";
import AutomationList from "../../AdminComponents/AdminSharedComponents/ContactAutomationList.vue";
import ContactCardClient from "../../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import ContactPageDeleteContact from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageDeleteContact.vue";
// import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ClientPageUpcomingEvents from "../../AdminComponents/AdminContactPageComponents/ClientPageComponents/ClientPageUpcomingEvents.vue";
import ContactPageResetPassword from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageResetPassword.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
// import TwoButtonDialogModal from "../../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";

export default {
  data() {
    return {
      contact: undefined,
      thread: undefined,
      conversation: undefined,
      events: [],
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
            icon: "email",
          },
          {
            title: "Reset Password",
            parameter: "reset-password",
            icon: "key",
          },
          {
            title: "delete",
            danger: true,
            parameter: "delete",
            icon: "trash-can",
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
    this.contact.associatedEvents.forEach((event) => {
      this.$store.dispatch("adminGetEvent", event).then((res) => {
        console.log(res);
        this.events.push(res.data.Item);
      });
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
    ToDoList,
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
@media screen {
  section {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 150px 300px 75px repeat(3, 300px);
    gap: 10px;
  }

  #contact-card {
    grid-row: 1 / 2;
  }
  #to-do {
    grid-row: 4 / 5;
  }

  #notes {
    grid-row: 5 / 6;
  }
  #messages {
    display: none;
    /* grid-row: 6/ 10; */
  }

  #button-bar {
    grid-row: 3/4;
  }

  #upcoming-events {
    grid-row: 2/3;
  }

  #automation {
    grid-row: 6/ 7;
    padding-bottom: 100px;
  }
  @media (min-width: 850px) {
    section {
      grid-template-columns: minmax(100px, 250px) repeat(8, 1fr);
      grid-template-rows: 75px minmax(30px, 50px) repeat(7, 1fr);
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
      display: unset;
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
      padding: 0;
    }
  }
}
</style>
