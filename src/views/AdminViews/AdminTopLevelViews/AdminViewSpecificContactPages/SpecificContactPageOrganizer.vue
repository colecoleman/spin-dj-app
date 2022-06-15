<template>
  <popup-email-composition
    v-if="popupOpen === 'send-email'"
    :contact="contact"
    @closeWindow="togglePopup"
  />
  <contact-page-reset-password
    :contact="contact"
    @togglePopup="togglePopup"
    v-if="popupOpen === 'reset-password'"
  />
  <contact-page-delete-contact
    :contact="contact"
    @toggle-popup="togglePopup"
    v-if="popupOpen === 'delete'"
  />
  <section v-if="contact">
    <contact-card-person
      id="contact-card"
      v-if="contact"
      :contact="contact"
      svg="person"
    />
    <contact-page-notes id="notes" v-if="contact" :contact="contact" />
    <to-do-list id="to-do" listType="contact" :contact="contact" />
    <four-button-bar-with-drop-down
      id="button-bar"
      :buttons="buttons"
      :dropdown="dropdown"
      @button-clicked="togglePopup"
      @dropdown-button-clicked="togglePopup"
    />
    <upcoming-events
      id="upcoming-events"
      :events="events"
      :pastEvents="pastEvents"
      v-if="!eventAssignmentOpen"
    />
    <contact-page-events-assignment
      v-if="eventAssignmentOpen"
      :events="events"
      :contact="contact"
      svg="calendar"
      @event-assignment-toggle="toggleEventAssignment()"
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
import ToDoList from "../../../../SharedComponents/SharedComponentsToDoList/ToDoList.vue";
import AutomationList from "../../AdminComponents/AdminSharedComponents/ContactAutomationList.vue";
import UpcomingEvents from "../../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEvents.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import ContactCardPerson from "../../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import ContactPageEventsAssignment from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageUpcomingEvents/ContactPageEventsAssignment.vue";
import ContactPageResetPassword from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageResetPassword.vue";
import ContactPageDeleteContact from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageDeleteContact.vue";
import Messaging from "../../../../SharedComponents/SharedComponentsMessaging/Messaging.vue";
// import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";

export default {
  data() {
    return {
      contact: undefined,
      eventAssignmentOpen: false,
      events: [],
      pastEvents: [],
      eventsLoaded: false,
      conversation: undefined,
      eventConversation: [],
      popupOpen: null,
      buttons: [
        {
          title: "Send Email",
          parameter: "send-email",
        },

        {
          title: "Assign Event",
          action: this.toggleEventAssignment,
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
    async toggleEventAssignment() {
      this.eventAssignmentOpen = !this.eventAssignmentOpen;
      await this.$store.dispatch("getAdminEvents");
      this.$store.dispatch("getEventsContacts");
      this.$store.dispatch("getEventsLocations");
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
    ContactCardPerson,
    ContactPageNotes,
    ToDoList,
    UpcomingEvents,
    ContactPageEventsAssignment,
    ContactPageDeleteContact,
    // MessagingSingleComponent,
    Messaging,
    ContactPageResetPassword,
    FourButtonBarWithDropDown,
    AutomationList,
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
    grid-template-rows: 150px 300px 125px repeat(3, 300px) 360px;
    gap: 10px;
  }

  #contact-card {
    grid-row: 1 / 2;
  }

  #upcoming-events {
    grid-row: 2/3;
  }
  #button-bar {
    grid-row: 3/ 4;
    z-index: 10;
  }
  #to-do {
    grid-row: 4 / 5;
  }

  #notes {
    grid-row: 5 / 6;
  }
  #messages {
    grid-row: 7/ 8;
    padding-bottom: 60px;
  }

  #automation {
    grid-row: 6/ 7;
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