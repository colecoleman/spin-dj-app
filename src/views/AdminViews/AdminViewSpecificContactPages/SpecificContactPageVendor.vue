<template>
  <popup-email-composition
    v-if="popupOpen === 'send-email'"
    :contact="contact"
    @closeWindow="togglePopup"
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
    <contact-card-person id="contact-card" :contact="contact" />
    <contact-card-company
      id="company-card"
      :contact="contact"
      v-if="contact"
      svg="person"
    />
    <messaging id="messages" :contact="contact" display="contact" />
    <four-button-bar-with-drop-down
      id="button-bar"
      :buttons="buttons"
      :dropdown="dropdown"
      @button-clicked="togglePopup"
      @dropdown-button-clicked="togglePopup"
    />
    <upcoming-events id="upcoming-events" :contact="contact" :events="events" />
    <contact-page-events-assignment
      id="upcoming-events"
      v-if="eventAssignmentOpen"
      :events="events"
      :contact="contact"
      svg="calendar"
      @event-assignment-toggle="toggleEventAssignment()"
    />
    <to-do-list id="to-do" :contact="contact" listType="contact" />
    <automation-list
      id="automation"
      :events="events"
      :contact="contact"
      automationType="Contact"
    />
    <contact-page-notes id="notes" :contact="contact" />
  </section>
</template>

<script>
import PopupEmailComposition from "../../../Components/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import ContactCardPerson from "../../../Components/SharedComponentsContact/ContactCardPerson.vue";
import ContactPageResetPassword from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageResetPassword.vue";
import ContactPageDeleteContact from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageDeleteContact.vue";
import Messaging from "../../../Components/SharedComponentsMessaging/Messaging.vue";

// import MessagingSingleComponent from "../../../Components/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../Components/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import UpcomingEvents from "../../../Components/SharedComponentsUpcomingEvents/UpcomingEvents.vue";
import ContactPageEventsAssignment from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageEventsAssignment.vue";
import ContactCardCompany from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactCardCompany.vue";
import ToDoList from "../../../Components/SharedComponentsToDoList/ToDoList.vue";
import AutomationList from "../../../Components/AdminComponents/AdminSharedComponents/ContactAutomationList.vue";
// import VendorPageReferralPopup from "../../../Components/AdminComponents/AdminContactPageComponents/VendorPageComponents/VendorPageReferralPopup.vue";
import ContactPageNotes from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";

export default {
  data() {
    return {
      eventAssignmentOpen: false,
      popupOpen: null,
      contact: undefined,
      events: [],
      eventsLoaded: false,
      pastEvents: [],
      conversation: undefined,
      eventConversation: [],
      buttons: [
        {
          title: "Send Email",
          parameter: "send-email",
        },
        // {
        //   title: "Refer Vendor",
        //   action: this.toggleReferral,
        // },
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
    toggleEventAssignment() {
      this.eventAssignmentOpen = !this.eventAssignmentOpen;
    },
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
    ContactCardCompany,
    ContactCardPerson,
    UpcomingEvents,
    ToDoList,
    ContactPageEventsAssignment,
    Messaging,
    AutomationList,
    ContactPageNotes,
    ContactPageDeleteContact,
    FourButtonBarWithDropDown,
    ContactPageResetPassword,
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
    grid-template-rows: 150px 70px 300px 1fr repeat(3, 300px) 360px;
    gap: 10px;
  }

  #contact-card {
    grid-row: 1 / 2;
  }

  #company-card {
    grid-row: 2/3;
  }

  #messages {
    grid-row: 8/9;
    padding-bottom: 60px;
  }

  #button-bar {
    grid-row: 4/ 5;
    z-index: 10;
  }

  #upcoming-events {
    grid-row: 3/4;
  }

  #to-do {
    grid-row: 5 / 6;
  }

  #automation {
    grid-row: 7/ 8;
  }

  #notes {
    grid-row: 6 / 7;
  }
  @media (min-width: 850px) {
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

    #company-card {
      grid-column: 1/3;
      grid-row: 3/4;
    }

    #messages {
      grid-column: 1/ 3;
      grid-row: 4/ 10;
      padding: 0;
    }

    #button-bar {
      grid-column: 3/ 10;
      grid-row: 1/ 2;
    }

    #upcoming-events {
      grid-column: 3/ 7;
      grid-row: 2/6;
    }

    #to-do {
      grid-column: 7 / 10;
      grid-row: 2 / 7;
    }

    #automation {
      grid-column: 3 / 7;
      grid-row: 6/ 10;
      padding: 0;
    }

    #notes {
      grid-column: 7 / 10;
      grid-row: 7 / 10;
    }
  }
}
</style>
