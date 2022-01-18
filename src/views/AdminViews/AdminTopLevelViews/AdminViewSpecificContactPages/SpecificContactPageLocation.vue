<template>
  <popup-email-composition
    v-if="emailPopupOpen && !notesPopupOpen"
    :contact="contact"
    @closeWindow="closePopups()"
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
      buttons: [
        {
          title: "Send Email",
          action: this.openEmailComposition,
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
            action: this.openEmailComposition,
            icon: SVGs.EmailSVG,
          },
        ],
      },
      emailPopupOpen: false,
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
    openEmailComposition() {
      this.emailPopupOpen = true;
    },
    toggleEventAssignment() {
      this.eventAssignmentOpen = !this.eventAssignmentOpen;
    },
    closePopups() {
      this.emailPopupOpen = false;
      this.notesPopupOpen = false;
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
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(20, 5%);
}

#location-card {
  grid-column: 1 / 4;
  grid-row: 1 / 6;
}

#contact-card {
  grid-column: 1 / 4;
  grid-row: 6 / 10;
}
#to-do {
  grid-column: 1 / 4;
  grid-row: 10 / 21;
}

#messages {
  grid-column: 8 /11;
  grid-row: 14 / 21;
}

#button-bar {
  grid-column: 4 / 11;
  grid-row: 1 / 4;
}

#upcoming-events {
  grid-column: 4 / 8;
  grid-row: 4 / 21;
}

#automation {
  grid-column: 8 / 11;
  grid-row: 4 / 12;
}
#notes {
  grid-column: 8 / 11;
  grid-row: 12 / 21;
}
</style>
