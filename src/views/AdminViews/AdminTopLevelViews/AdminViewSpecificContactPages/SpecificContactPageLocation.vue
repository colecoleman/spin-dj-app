<template>
  <popup-email-composition
    v-if="popupOpen === 'send-email'"
    :contact="contact"
    @closeWindow="togglePopup"
  ></popup-email-composition>
  <section>
    <div id="location-card">
      <contact-card-location
        v-if="location"
        :icon="SVGs.LocationMarkerSVG"
        :location="location"
      ></contact-card-location>
    </div>
    <div id="to-do">
      <contact-page-to-do-list :contact="location"></contact-page-to-do-list>
    </div>
    <div id="button-bar">
      <four-button-bar-with-drop-down
        :buttons="buttons"
        :dropdown="dropdown"
        @button-clicked="togglePopup"
      ></four-button-bar-with-drop-down>
    </div>
    <div id="upcoming-events">
      <location-page-upcoming-events
        v-if="location"
        :location="location"
        :icon="SVGs.CalendarSVG"
        @event-assignment-toggle="toggleEventAssignment()"
        :eventAssignmentOpen="eventAssignmentOpen"
      ></location-page-upcoming-events>
    </div>
    <div id="contact-card">
      <!-- <location-preferred-information></location-preferred-information> -->
      <contact-card-person :contact="contact"></contact-card-person>
    </div>
    <div id="automation">
      <automation-list
        :automations="automations"
        automationType="Contact"
        :contacts="[contact]"
        :id="$route.params.id"
      ></automation-list>
    </div>
    <div id="notes">
      <contact-page-notes :contact="location"></contact-page-notes>
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
import SVGs from "../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      eventAssignmentOpen: false,
      location: undefined,
      contact: undefined,
      popupOpen: null,
      buttons: [
        {
          title: "Send Email",
          // action: this.openEmailComposition,
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
            action: this.openEmailComposition,
            icon: SVGs.EmailSVG,
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
    openEmailComposition() {
      this.emailPopupOpen = true;
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
}
#notes {
  grid-column: 7/10;
  grid-row: 6/ 10;
}
</style>
