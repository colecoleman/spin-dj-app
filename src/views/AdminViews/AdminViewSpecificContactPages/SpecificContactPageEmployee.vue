<template>
  <popup-email-composition
    v-if="popupOpen === 'send-email'"
    :contact="contact"
    @close-window="togglePopup"
  />
  <contact-page-delete-contact
    :contact="contact"
    @toggle-popup="togglePopup"
    v-if="popupOpen === 'delete'"
  />
  <employee-page-availability-manager
    v-if="popupOpen === 'availability-manager'"
    :employee="contact"
    @close-popup="togglePopup"
  />
  <contact-page-reset-password
    :contact="contact"
    @togglePopup="togglePopup"
    v-if="popupOpen === 'reset-password'"
  />
  <contact-information-edit
    v-if="popupOpen === 'edit-card'"
    :contact="contact"
    @close-edit-card="togglePopup"
    @edit-contact="editContact"
  />
  <section v-if="contact">
    <contact-card-person
      id="contact-card"
      :contact="contact"
      svg="person"
      @open-edit-card="togglePopup('edit-card')"
    />
    <to-do-list id="to-do" listType="contact" :contact="contact" />
    <contact-page-notes id="notes" :contact="contact" />
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
      id="upcoming-events"
      v-if="eventAssignmentOpen"
      :events="this.$store.state.events"
      :contact="contact"
      svg="calendar"
      @event-assignment-toggle="toggleEventAssignment()"
    />
    <automation-list
      id="automation"
      :automations="automations"
      :events="events"
      :contact="contact"
      automationType="Contact"
    />
    <messaging id="messages" display="contact" :contact="contact" />
  </section>
</template>

<script>
import UpcomingEvents from "../../../Components/SharedComponentsUpcomingEvents/UpcomingEvents.vue";
import ContactPageEventsAssignment from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageEventsAssignment.vue";
import ToDoList from "../../../Components/SharedComponentsToDoList/ToDoList.vue";
import AutomationList from "../../../Components/AdminComponents/AdminSharedComponents/ContactAutomationList.vue";
import ContactPageNotes from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import ContactCardPerson from "../../../Components/SharedComponentsContact/ContactCardPerson.vue";
import EmployeePageAvailabilityManager from "../../../Components/AdminComponents/AdminContactPageComponents/EmployeePageComponents/EmployeePageAvailabilityManager/EmployeePageAvailabilityManager.vue";
import PopupEmailComposition from "../../../Components/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import ContactPageResetPassword from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageResetPassword.vue";
import Messaging from "../../../Components/SharedComponentsMessaging/Messaging.vue";
import FourButtonBarWithDropDown from "../../../Components/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ContactPageDeleteContact from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageDeleteContact.vue";
import ContactInformationEdit from "../../../Components/SharedComponentsContact/ContactInformationEdit.vue";

export default {
  data() {
    return {
      contact: undefined,
      events: [],
      pastEvents: [],
      eventAssignmentOpen: false,
      conversation: undefined,
      eventConversation: [],
      popupOpen: null,
      buttons: [
        {
          title: "Send Email",
          parameter: "send-email",
        },
        {
          title: "Assign Events",
          action: this.toggleEventAssignment,
        },
        {
          title: "Availability",
          parameter: "availability-manager",
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
            icon: "delete",
          },
        ],
      },
      availabilityManagerOpen: false,
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
    EmployeePageAvailabilityManager,
    ContactPageEventsAssignment,
    Messaging,
    ContactCardPerson,
    ToDoList,
    UpcomingEvents,
    AutomationList,
    ContactPageNotes,
    ContactPageResetPassword,
    ContactPageDeleteContact,
    ContactInformationEdit,
    // MessagingSingleComponent,
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
    grid-template-rows: 150px 300px 1fr repeat(3, 300px) 360px;
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
    /* grid-row: 6/ 10; */
    /* display: none; */
    grid-row: 7/8;
    padding-bottom: 60px;
  }

  #button-bar {
    grid-row: 3/ 4;
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
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: minmax(0, 1fr) repeat(8, minmax(0, 1fr));
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
      padding-bottom: 0;
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