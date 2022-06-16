<template>
  <popup-email-composition
    v-if="popupOpen === 'send-email'"
    :contact="contact"
    @closeWindow="togglePopup"
  />

  <section v-if="location">
    <contact-card-location
      id="location-card"
      v-if="location"
      svg="location-marker"
      :location="location"
    />
    <to-do-list id="to-do" listType="contact" :contact="location" />
    <four-button-bar-with-drop-down
      id="button-bar"
      :buttons="buttons"
      :dropdown="dropdown"
      @button-clicked="togglePopup"
      @dropdown-button-clicked="togglePopup"
    />
    <location-page-upcoming-events
      id="upcoming-events"
      v-if="location"
      :location="location"
      :events="events"
      svg="calendar"
      @event-assignment-toggle="toggleEventAssignment()"
      :eventAssignmentOpen="eventAssignmentOpen"
    />
    <contact-list
      id="contact-card"
      :contacts="location.contacts"
      :location="location"
    />
    <automation-list
      id="automation"
      :automations="automations"
      automationType="Contact"
      :contacts="[contact]"
    />
    <contact-page-notes id="notes" :contact="location" />
  </section>
</template>

<script>
import ToDoList from "../../../Components/SharedComponentsToDoList/ToDoList.vue";

import AutomationList from "../../../Components/AdminComponents/AdminSharedComponents/ContactAutomationList.vue";
import ContactPageNotes from "../../../Components/AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import LocationPageUpcomingEvents from "../../../Components/AdminComponents/AdminContactPageComponents/LocationPageComponents/LocationUpcomingEvents.vue";
// import LocationPreferredInformation from "../ContactPageComponents/LocationPageComponents/LocationPreferredInformation.vue";
import ContactCardLocation from "../../../Components/AdminComponents/AdminContactPageComponents/LocationPageComponents/ContactCardLocation.vue";
import ContactList from "../../../Components/ContactList/LocationContactList.vue";
import PopupEmailComposition from "../../../Components/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import FourButtonBarWithDropDown from "../../../Components/SharedComponentsUI/FourButtonBarWithDropDown.vue";

export default {
  data() {
    return {
      eventAssignmentOpen: false,
      location: undefined,
      contact: undefined,
      popupOpen: null,
      automations: [],
      events: [],
      buttons: [
        {
          title: "Send Email",
          parameter: "send-email",
        },
        // {
        //   title: "Assign Event",
        //   action: this.toggleEventAssignment,
        // },
      ],
      dropdown: {
        title: "Actions",
        actionItems: [
          {
            title: "Email",
            parameter: "send-email",
            icon: "email",
          },
        ],
      },
    };
  },
  async created() {
    this.location = await this.$store.dispatch(
      "getUser",
      this.$route.params.id
    );
    if (!this.location.contacts) {
      this.location.contacts = [];
    }
    await this.$store.dispatch("getLocationContacts", this.location);
    this.events = await this.$store.dispatch(
      "getLocationEvents",
      this.location
    );
    for (let x = 0; x < this.events.length; x++) {
      this.$store.dispatch("getEventContacts", this.events[x]);
      this.$store.dispatch("getEventLocations", this.events[x]);
    }
    console.log(this.location);
  },
  methods: {
    togglePopup(popup) {
      if (this.popupOpen !== null) {
        this.popupOpen = null;
      } else {
        this.popupOpen = popup;
      }
    },
    toggleEventAssignment() {
      this.eventAssignmentOpen = !this.eventAssignmentOpen;
    },
  },

  components: {
    PopupEmailComposition,
    ContactList,
    ToDoList,
    LocationPageUpcomingEvents,
    ContactPageNotes,
    AutomationList,
    ContactCardLocation,
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
    grid-template-rows: 150px 150px 300px 1fr repeat(3, 300px);
    gap: 10px;
  }

  #location-card {
    grid-row: 1 / 2;
  }

  #contact-card {
    grid-row: 2/3;
  }
  #upcoming-events {
    grid-row: 3/4;
  }
  #button-bar {
    grid-row: 4/ 5;
    z-index: 10;
  }
  #to-do {
    grid-row: 5 / 6;
  }
  #notes {
    grid-row: 6/ 7;
  }

  #automation {
    grid-row: 7/ 8;
    padding-bottom: 100px;
  }
  #messages {
    display: none;
    /* grid-row: 5/10; */
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

    #location-card {
      grid-column: 1 / 3;
      grid-row: 1 / 3;
    }

    #contact-card {
      grid-column: 1/3;
      grid-row: 3/5;
    }
    #to-do {
      grid-column: 1 / 3;
      grid-row: 5 / 10;
    }

    #messages {
      display: unset;
      grid-column: 8 /11;
      grid-row: 5/10;
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
    #notes {
      grid-column: 7/10;
      grid-row: 6/ 10;
    }
  }
}
</style>
