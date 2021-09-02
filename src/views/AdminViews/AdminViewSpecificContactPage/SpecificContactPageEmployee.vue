<template>
  <popup-email-composition
    v-if="emailPopupOpen && !notesPopupOpen"
    :contact="contact"
    @cancel-send-email="closePopups()"
  ></popup-email-composition>
  <popup-employee-calendar
    v-if="calendarUtilityOpen"
    :employee="contact"
    @close-popup="closePopups()"
  ></popup-employee-calendar>
  <employee-page-availability-manager
    v-if="availabilityManagerOpen"
    :employee="contact"
    @close-popup="closePopups()"
  ></employee-page-availability-manager>
  <div id="section-wrapper">
    <div id="left-column">
      <div id="box-one">
        <contact-card-person
          :contact="contact"
          :icon="personsvg"
        ></contact-card-person>
      </div>
      <div id="box-two">
        <contact-page-to-do-list :id="contact.id"></contact-page-to-do-list>
      </div>
      <div id="box-three">
        <contact-page-notes
          :notes="contact.notes"
          :contact="contact"
          category="employee"
        ></contact-page-notes>
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
        <contact-page-upcoming-events
          :contact="contact"
          :icon="calendarsvg"
        ></contact-page-upcoming-events>
      </div>
      <div id="box-six">
        <div id="box-six-half">
          <contact-page-automation></contact-page-automation>
        </div>
        <div id="box-six-half-two">
          <base-card :icon="messageBubble">
            <template v-slot:title>Messages</template>
            <template v-slot:content>
              <messaging-single-component
                :contact="contact"
                :id="contact.id"
              ></messaging-single-component>
            </template>
          </base-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ContactPageAutomation,
  ContactCardPerson,
  ContactPageToDoList,
  ContactPageUpcomingEvents,
  ContactPageNotes,
} from "./ContactPageComponents/contactPageIndex.js";

import PopupEmployeeCalendar from "./ContactPageComponents/EmployeePageComponents/PopupEmployeeCalendarUtility.vue";
import EmployeePageAvailabilityManager from "./ContactPageComponents/EmployeePageComponents/EmployeePageAvailabilityManager/EmployeePageAvailabilityManager.vue";
import PopupEmailComposition from "../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import MessagingSingleComponent from "../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";

import personsvg from "../../../assets/SVGs/person.svg";
import messageBubble from "../../../assets/SVGs/message-bubble.svg";
import calendarsvg from "../../../assets/SVGs/calendar.svg";
import clipboardsvg from "../../../assets/SVGs/clipboard.svg";
import automationsvg from "../../../assets/SVGs/automation.svg";
import emailsvg from "../../../assets/SVGs/email.svg";
import keysvg from "../../../assets/SVGs/key.svg";

export default {
  data() {
    return {
      personsvg,
      messageBubble,
      calendarsvg,
      clipboardsvg,
      automationsvg,
      keysvg,
      buttons: [
        {
          title: "Send Email",
          action: this.openEmailComposition,
        },
        {
          title: "Assign Events",
          action: this.openCalendarUtility,
        },
        {
          title: "Availability",
          action: this.openAvailabilityManager,
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
          {
            title: "Reset Password",
            action: this.resetPassword,
            icon: keysvg,
          },
        ],
      },
      emailPopupOpen: false,
      notesPopupOpen: false,
      calendarUtilityOpen: false,
      availabilityManagerOpen: false,
    };
  },
  computed: {
    contact() {
      let id = this.$route.params.id;
      return this.$store.state.contacts.employees.find((x) => x.id == id);
    },
  },
  methods: {
    addToDo() {
      console.log("clicked!");
    },
    openEmailComposition() {
      this.emailPopupOpen = true;
    },
    openCalendarUtility() {
      this.calendarUtilityOpen = true;
    },
    openAvailabilityManager() {
      this.availabilityManagerOpen = true;
    },
    viewNotes() {
      console.log("notes open");
    },
    closePopups() {
      this.emailPopupOpen = false;
      this.calendarUtilityOpen = false;
      this.availabilityManagerOpen = false;
    },
  },
  components: {
    PopupEmailComposition,
    EmployeePageAvailabilityManager,
    PopupEmployeeCalendar,
    ContactCardPerson,
    ContactPageToDoList,
    ContactPageUpcomingEvents,
    ContactPageAutomation,
    ContactPageNotes,
    MessagingSingleComponent,
    FourButtonBarWithDropDown,
  },
};
</script>

<style scoped>
#section-wrapper {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  display: flex;
  /* flex-direction: row; */
}

#left-column {
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#box-one {
  height: 30%;
}
#box-two {
  height: 35%;
}

#box-three {
  height: 35%;
}

#right-column {
  width: 70%;
  display: flex;
  flex-direction: column;
}

#box-four {
  height: 18%;
}

#box-five {
  height: 40%;
}

#box-six {
  height: 42%;
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