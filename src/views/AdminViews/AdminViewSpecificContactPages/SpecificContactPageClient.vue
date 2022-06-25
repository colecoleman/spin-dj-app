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
  <contact-edit-card
    v-if="popupOpen === 'edit-card'"
    :contact="contact"
    @close-edit-card="togglePopup"
    @edit-contact="editContact"
  />

  <section v-if="contact">
    <contact-card-client
      id="contact-card"
      :contact="contact"
      svg="person"
      @email-contact="togglePopup('send-email')"
      @open-edit-card="togglePopup('edit-card')"
    />
    <to-do-list id="to-do" :contact="contact" listType="contact" />
    <contact-page-notes
      id="notes"
      :contact="contact"
      :notesPrivate="contact.notesPrivate"
      :notesPublic="contact.notesPublic"
      v-if="contact"
    />
    <four-button-bar-with-drop-down
      id="button-bar"
      :buttons="buttons"
      :dropdown="dropdown"
      @button-clicked="togglePopup"
      @dropdown-button-clicked="togglePopup"
    />
    <client-page-upcoming-events
      id="upcoming-events"
      :contact="contact"
      :events="events"
      svg="calendar"
    />
    <automation-list
      id="automation"
      :events="events"
      :contact="contact"
      automationType="Contact"
    />

    <messaging id="messages" display="contact" :contact="contact" />
  </section>
</template>

<script>
import ToDoList from "../../../Components/SharedComponentsToDoList/ToDoList.vue";
import AutomationList from "../../../Components/AdminComponents/AdminSharedComponents/ContactAutomationList.vue";
import ContactCardClient from "../../../Components/SharedComponentsContact/ContactCardPerson.vue";
import PopupEmailComposition from "../../../Components/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import ContactPageDeleteContact from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageDeleteContact.vue";
// import MessagingSingleComponent from "../../../Components/SharedComponentsMessaging/MessagingSingleComponent.vue";
import Messaging from "../../../Components/SharedComponentsMessaging/Messaging.vue";
import FourButtonBarWithDropDown from "../../../Components/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ClientPageUpcomingEvents from "../../../Components/AdminComponents/AdminContactPageComponents/ClientPageComponents/ClientPageUpcomingEvents.vue";
import ContactPageResetPassword from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageResetPassword.vue";
import ContactPageNotes from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import ContactEditCard from "../../../Components/SharedComponentsContact/ContactInformationEdit.vue";
// import TwoButtonDialogModal from "../../../Components/SharedComponentsUI/TwoButtonDialogModal.vue";

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
    editContact(payload) {
      this.contact[payload.variable] = payload.value;
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
    Messaging,
    ContactEditCard,
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
    grid-template-rows: 150px 300px 75px repeat(3, 300px) 360px;
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
    grid-row: 7/8;
    padding-bottom: 60px;
  }

  #button-bar {
    grid-row: 3/4;
    z-index: 10;
  }

  #upcoming-events {
    grid-row: 2/3;
  }

  #automation {
    grid-row: 6/ 7;
  }
  @media (min-width: 850px) {
    section {
      grid-template-columns: minmax(100px, 250px) repeat(8, 1fr);
      grid-template-rows: 75px minmax(30px, 50px) repeat(7, minmax(0, 1fr));
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
      padding: 0;
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
