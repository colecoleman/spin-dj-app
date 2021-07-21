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
        <contact-card-person
          :contact="contact"
          :icon="personsvg"
        ></contact-card-person>
      </div>
      <div id="box-two">
        <contact-page-to-do-list :id="contact.id"></contact-page-to-do-list>
      </div>
    </div>
    <div id="right-column">
      <div id="box-three">
        <four-button-bar-with-drop-down
          :buttons="buttons"
          :dropdown="dropdown"
        ></four-button-bar-with-drop-down>
      </div>
      <div id="box-four">
        <contact-page-upcoming-events
          :id="contact.id"
          :icon="calendarsvg"
        ></contact-page-upcoming-events>
      </div>
      <div id="box-five">
        <div id="box-five-half">
          <contact-page-automation></contact-page-automation>
        </div>
        <div id="box-five-half-two">
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
} from "./ContactPageComponents/contactPageIndex.js";

import PopupEmailComposition from "../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import PopupNotesView from "../../../SharedComponents/SharedComponentsPopupUtilities/PopupNotesView.vue";
import MessagingSingleComponent from "../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";

import personsvg from "../../../assets/SVGs/person.svg";
import messageBubble from "../../../assets/SVGs/message-bubble.svg";
import calendarsvg from "../../../assets/SVGs/calendar.svg";
import clipboardsvg from "../../../assets/SVGs/clipboard.svg";
import automationsvg from "../../../assets/SVGs/automation.svg";
import emailsvg from "../../../assets/SVGs/email.svg";

export default {
  data() {
    return {
      personsvg,
      messageBubble,
      calendarsvg,
      clipboardsvg,
      automationsvg,
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
    ContactCardPerson,
    ContactPageToDoList,
    ContactPageUpcomingEvents,
    ContactPageAutomation,
    MessagingSingleComponent,

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
  /* display: flex; */
  flex-direction: column;
}

#box-one {
  height: 60%;
}
#box-two {
  height: 40%;
}

#right-column {
  width: 70%;
  height: calc(100% - 5px);
}

#box-three {
  height: 18%;
}

#box-four {
  height: 40%;
}

#box-five {
  height: 42%;
  display: flex;
  flex-direction: row;
}

#box-five-half {
  width: 55%;
}

#box-five-half-two {
  width: 45%;
}
</style>