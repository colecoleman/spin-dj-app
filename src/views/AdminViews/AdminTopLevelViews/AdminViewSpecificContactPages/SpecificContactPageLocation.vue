<template>
  <popup-email-composition
    v-if="popupOpen === 'send-email'"
    :contact="contact"
    @closeWindow="togglePopup"
  />
  <!-- <contact-page-delete-contact
    :contact="contact"
    @toggle-popup="togglePopup"
    v-if="popupOpen === 'delete'"
  /> -->
  <section>
    <div id="location-card">
      <contact-card-location
        v-if="location"
        svg="location-marker"
        :location="location"
      />
    </div>
    <div id="to-do">
      <contact-page-to-do-list :contact="location" />
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
      <location-page-upcoming-events
        v-if="location"
        :location="location"
        svg="calendar"
        @event-assignment-toggle="toggleEventAssignment()"
        :eventAssignmentOpen="eventAssignmentOpen"
      />
    </div>
    <div id="contact-card">
      <!-- <location-preferred-information></location-preferred-information> -->
      <contact-card-person :contact="contact" />
    </div>
    <div id="automation">
      <automation-list
        :automations="automations"
        automationType="Contact"
        :contacts="[contact]"
        :id="$route.params.id"
      />
    </div>
    <div id="notes">
      <contact-page-notes :contact="location" />
    </div>
  </section>
</template>

<script>
import ContactPageToDoList from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageToDoList.vue";
import AutomationList from "../../AdminComponents/AdminSharedComponents/AutomationList.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import LocationPageUpcomingEvents from "../../AdminComponents/AdminContactPageComponents/LocationPageComponents/LocationUpcomingEvents.vue";
// import LocationPreferredInformation from "../ContactPageComponents/LocationPageComponents/LocationPreferredInformation.vue";
import ContactCardLocation from "../../AdminComponents/AdminContactPageComponents/LocationPageComponents/ContactCardLocation.vue";
import ContactCardPerson from "../../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";

export default {
  data() {
    return {
      eventAssignmentOpen: false,
      location: undefined,
      contact: undefined,
      popupOpen: null,
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
    await this.$store
      .dispatch("adminGetContact", this.$route.params.id)
      .then((res) => {
        console.log(res);
        this.location = res.data.Item;
      });
    if (this.location.contacts.length > 0) {
      await this.$store
        .dispatch("adminGetContact", this.location.contacts[0])
        .then((res) => {
          this.contact = res.data.Item;
        });
    }
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
    ContactCardPerson,
    ContactPageToDoList,
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
