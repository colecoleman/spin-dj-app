<template>
  <popup-email-composition
    v-if="emailPopupOpen && !notesPopupOpen"
    :contact="contact"
    @closeWindow="closePopups()"
  ></popup-email-composition>
  <div id="section-wrapper">
    <div id="left-column">
      <div id="box-one">
        <contact-card-location
          v-if="location"
          :icon="SVGs.LocationMarkerSVG"
          :location="location"
        ></contact-card-location>
      </div>
      <div id="box-two"></div>
      <div id="box-three">
        <contact-page-to-do-list :contact="location"></contact-page-to-do-list>
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
            v-if="location"
            :location="location"
            :icon="SVGs.CalendarSVG"
            @event-assignment-toggle="toggleEventAssignment()"
            :eventAssignmentOpen="eventAssignmentOpen"
          ></location-page-upcoming-events>
        </div>
        <div id="box-five-half-two">
          <!-- <location-preferred-information></location-preferred-information> -->
          <location-contact-card-person
            :contact="contact"
            :location="location"
            :icon="SVGs.PersonSVG"
          ></location-contact-card-person>
        </div>
      </div>
      <div id="box-six">
        <div id="box-six-half">
          <contact-page-automation></contact-page-automation>
        </div>
        <div id="box-six-half-two">
          <contact-page-notes :contact="location"></contact-page-notes>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactPageToDoList from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageToDoList.vue";
import ContactPageAutomation from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageAutomation.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import LocationPageUpcomingEvents from "../../AdminComponents/AdminContactPageComponents/LocationPageComponents/LocationUpcomingEvents.vue";
// import LocationPreferredInformation from "../ContactPageComponents/LocationPageComponents/LocationPreferredInformation.vue";
import ContactCardLocation from "../../AdminComponents/AdminContactPageComponents/LocationPageComponents/ContactCardLocation.vue";
import LocationContactCardPerson from "../../AdminComponents/AdminContactPageComponents/LocationPageComponents/LocationContactCardPerson.vue";
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
        console.log(res.data.Item);
        this.location = res.data.Item;
      });
    if (this.location.contacts.length > 0) {
      await this.$store
        .dispatch("adminGetContact", this.location.contacts[0])
        .then((res) => {
          console.log(res.data.Item);
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
    LocationContactCardPerson,
    ContactPageToDoList,
    LocationPageUpcomingEvents,
    // LocationPreferredInformation,
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
  /* height: 70%; */
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
  /* max-height: 40%; */
  height: 45%;
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
  height: 40%;
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