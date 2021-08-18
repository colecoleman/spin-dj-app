<template>
  <popup-email-composition
    v-if="emailPopupOpen && !notesPopupOpen"
    :contact="contact"
    @cancel-send-email="closePopups()"
  ></popup-email-composition>
  <popup-notes-view v-if="!emailPopupOpen && notesPopupOpen"></popup-notes-view>
  <div id="section-wrapper">
    <div id="left-column">
      <div id="box-one">
        <contact-card-location
          :icon="locationmarker"
          :location="location"
        ></contact-card-location>
      </div>
      <div id="box-two">
        <location-contact-card-person
          :contact="contact"
          :icon="personsvg"
        ></location-contact-card-person>
      </div>
      <div id="box-three">
        <contact-page-to-do-list :id="contact.id"></contact-page-to-do-list>
      </div>
    </div>
    <div id="right-column">
      <div id="box-four">
        <four-button-bar-with-drop-down
          :buttons="buttons"
          :dropdown="dropdown"
        ></four-button-bar-with-drop-down>
      </div>
      <div id="box-five">
        <div id="box-five-half-one">
          <location-page-upcoming-events
            :location="location"
            :icon="calendarsvg"
          ></location-page-upcoming-events>
        </div>
        <div id="box-five-half-two">
          <location-preferred-information></location-preferred-information>
        </div>
      </div>
      <div id="box-six">
        <div id="box-six-half">
          <contact-page-automation></contact-page-automation>
        </div>
        <div id="box-six-half-two">
          <contact-page-notes
            :notes="location.notes"
            :contact="location"
            contactCategory="location"
          ></contact-page-notes>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ContactPageAutomation,
  ContactPageToDoList,
  ContactPageNotes,
} from "../ContactPageComponents/contactPageIndex.js";

import LocationPageUpcomingEvents from "../ContactPageComponents/LocationPageComponents/LocationUpcomingEvents.vue";
import LocationPreferredInformation from "../ContactPageComponents/LocationPageComponents/LocationPreferredInformation.vue";
import ContactCardLocation from "../ContactPageComponents/LocationPageComponents/ContactCardLocation.vue";
import LocationContactCardPerson from "../ContactPageComponents/LocationPageComponents/LocationContactCardPerson.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import PopupNotesView from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupNotesView.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";

import personsvg from "../../../../assets/SVGs/person.svg";
import messageBubble from "../../../../assets/SVGs/message-bubble.svg";
import calendarsvg from "../../../../assets/SVGs/calendar.svg";
import clipboardsvg from "../../../../assets/SVGs/clipboard.svg";
import automationsvg from "../../../../assets/SVGs/automation.svg";
import emailsvg from "../../../../assets/SVGs/email.svg";
import locationmarker from "../../../../assets/SVGs/location-marker.svg";

export default {
  data() {
    return {
      personsvg,
      messageBubble,
      calendarsvg,
      clipboardsvg,
      automationsvg,
      locationmarker,
      buttons: [
        {
          title: "Send Email",
          action: this.openEmailComposition,
        },
        {
          title: "View Notes",
          action: this.viewNotes,
        },
      ],
      dropdown: {
        title: "Actions",
        actionItems: [
          {
            title: "Email",
            action: this.openEmailComposition,
            icon: emailsvg,
          },
        ],
      },
      emailPopupOpen: false,
      notesPopupOpen: false,
    };
  },
  computed: {
    location() {
      let id = this.$route.params.id;
      return this.$store.state.contacts.locations.find((x) => x.id == id);
    },
    contact() {
      let id = this.location.associatedVendorId;
      return this.$store.state.contacts.vendors.find((x) => (x.id = id));
    },
  },
  methods: {
    addToDo() {
      console.log("clicked!");
    },
    openEmailComposition() {
      this.emailPopupOpen = true;
    },
    viewNotes() {
      console.log("notes open");
    },
    closePopups() {
      this.emailPopupOpen = false;
      this.notesPopupOpen = false;
    },
  },
  components: {
    PopupEmailComposition,
    PopupNotesView,
    LocationContactCardPerson,
    ContactPageToDoList,
    LocationPageUpcomingEvents,
    LocationPreferredInformation,
    ContactPageNotes,
    ContactPageAutomation,
    ContactCardLocation,
    FourButtonBarWithDropDown,
  },
};
</script>

<style scoped>
#section-wrapper {
  width: 100%;
  height: 95%;
  padding-top: 10px;
  display: flex;
  /* flex-direction: row; */
}

svg {
  fill: white;
}

#left-column {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#box-one {
  /* height: 25%; */
}
#box-two {
}

#box-three {
  flex-grow: 1;
}

#right-column {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#box-four {
}

#box-five {
  max-height: 40%;
  height: 40%;
  display: flex;
  flex-direction: row;
}

#box-five-half-one {
  width: 60%;
}
#box-five-half-two {
  width: 40%;
}

#box-six {
  height: 41%;
  display: flex;
  flex-direction: row;
}

#box-six-half {
  width: 55%;
}

#box-six-half-two {
  width: 45%;
}
</style>