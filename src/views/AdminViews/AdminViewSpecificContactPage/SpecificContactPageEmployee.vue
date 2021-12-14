<template>
  <popup-email-composition
    v-if="emailPopupOpen && !notesPopupOpen"
    :contact="contact"
    @cancel-send-email="closePopups()"
  ></popup-email-composition>
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
          :icon="SVGs.PersonSVG"
        ></contact-card-person>
      </div>
      <div id="box-two">
        <contact-page-to-do-list :contact="contact"></contact-page-to-do-list>
      </div>
      <div id="box-three">
        <contact-page-notes :contact="contact"></contact-page-notes>
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
          v-if="contact"
          :contact="contact"
          :icon="SVGs.CalendarSVG"
          @event-assignment-toggle="toggleEventAssignment()"
          :eventAssignmentOpen="eventAssignmentOpen"
        ></contact-page-upcoming-events>
      </div>
      <div id="box-six">
        <div id="box-six-half">
          <contact-page-automation></contact-page-automation>
        </div>
        <div id="box-six-half-two">
          <base-card :icon="SVGs.MessageBubbleSVG">
            <template v-slot:title>Messages</template>
            <template v-slot:content>
              <messaging-single-component
                v-if="contact"
                :contact="contact"
                :id="contact.userId"
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

import EmployeePageAvailabilityManager from "./ContactPageComponents/EmployeePageComponents/EmployeePageAvailabilityManager/EmployeePageAvailabilityManager.vue";
import PopupEmailComposition from "../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import MessagingSingleComponent from "../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import SVGs from "../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      contact: undefined,
      eventAssignmentOpen: false,
      buttons: [
        {
          title: "Send Email",
          action: this.openEmailComposition,
        },
        {
          title: "Assign Events",
          action: this.toggleEventAssignment,
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
            icon: SVGs.EmailSVG,
          },
          // {
          //   title: "Reset Password",
          //   action: this.resetPassword,
          //   icon: keysvg,
          // },
        ],
      },
      emailPopupOpen: false,
      notesPopupOpen: false,
      availabilityManagerOpen: false,
    };
  },
  computed: {},
  methods: {
    addToDo() {
      console.log("clicked!");
    },
    openEmailComposition() {
      this.emailPopupOpen = true;
    },
    toggleEventAssignment() {
      this.eventAssignmentOpen = !this.eventAssignmentOpen;
    },
    openAvailabilityManager() {
      this.availabilityManagerOpen = true;
    },
    closePopups() {
      this.emailPopupOpen = false;
      this.calendarUtilityOpen = false;
      this.availabilityManagerOpen = false;
    },
  },
  async created() {
    await this.$store
      .dispatch("adminGetContact", this.$route.params.id)
      .then((res) => {
        console.log(res.data.Item);
        this.contact = res.data.Item;
      });
  },
  components: {
    PopupEmailComposition,
    EmployeePageAvailabilityManager,
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