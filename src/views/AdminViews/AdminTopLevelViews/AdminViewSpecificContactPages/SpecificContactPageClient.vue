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
      <client-page-upcoming-events
        :contact="contact"
        :events="events"
        svg="calendar"
      />
    </div>

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
          // {
          //   title: "delete",
          //   danger: true,
          //   parameter: "delete",
          //   icon: "trash-can",
          // },
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
  },
  async created() {
    this.contact = await this.$store.dispatch("getUser", this.$route.params.id);
    this.events = await this.$store.dispatch("getContactEvents", this.contact);
    for (let x = 0; x < this.events.length; x++) {
      this.$store.dispatch("getEventContacts", this.events[x]);
      this.$store.dispatch("getEventLocations", this.events[x]);
    }
  },
  components: {
    PopupEmailComposition,
    ContactCardClient,
    ToDoList,
    ClientPageUpcomingEvents,
    ContactPageResetPassword,
    ContactPageDeleteContact,
    AutomationList,
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
