<template>
  <popup-email-composition
    v-if="emailPopupOpen && !notesPopupOpen"
    :contact="contact"
    @closeWindow="closePopups()"
  ></popup-email-composition>
  <vendor-page-referral-popup
    v-if="referPopupOpen && !emailPopupOpen && !notesPopupOpen"
    :vendor="contact"
    @close-referral-window="closePopups()"
  ></vendor-page-referral-popup>
  <div id="section-wrapper">
    <div id="left-column">
      <div id="box-one">
        <contact-card-company
          :contact="contact"
          :icon="personsvg"
        ></contact-card-company>
      </div>
      <div id="box-two">
        <contact-page-to-do-list :contact="contact"></contact-page-to-do-list>
      </div>
      <div id="box-three">
        <contact-page-notes :contact="contact" />
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
          @event-assignment-toggle="toggleEventAssignment()"
          :eventAssignmentOpen="eventAssignmentOpen"
          v-if="contact"
        ></contact-page-upcoming-events>
      </div>
      <div id="box-six">
        <div id="box-six-half">
          <contact-page-automation></contact-page-automation>
        </div>
        <div id="box-six-half-two">
          <base-card :icon="messageBubble">
            <template v-slot:title>Messages</template>
            <template v-slot:content v-if="contact">
              <messaging-single-component
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
  ContactPageToDoList,
  ContactPageUpcomingEvents,
} from "../ContactPageComponents/contactPageIndex.js";

import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ContactCardCompany from "../../../../views/AdminViews/AdminViewSpecificContactPage/ContactPageComponents/ContactCardCompany.vue";
import VendorPageReferralPopup from "../ContactPageComponents/VendorPageComponents/VendorPageReferralPopup.vue";
import ContactPageNotes from "../ContactPageComponents/ContactPageNotes/ContactPageNotes.vue";

import personsvg from "../../../../assets/SVGs/person.svg";
import messageBubble from "../../../../assets/SVGs/message-bubble.svg";
import calendarsvg from "../../../../assets/SVGs/calendar.svg";
import clipboardsvg from "../../../../assets/SVGs/clipboard.svg";
import automationsvg from "../../../../assets/SVGs/automation.svg";
import emailsvg from "../../../../assets/SVGs/email.svg";
// import keysvg from "../../../../assets/SVGs/key.svg";

export default {
  data() {
    return {
      personsvg,
      messageBubble,
      calendarsvg,
      clipboardsvg,
      automationsvg,
      eventAssignmentOpen: false,
      contact: undefined,
      buttons: [
        {
          title: "Send Email",
          action: this.openEmailComposition,
        },
        {
          title: "Refer Vendor",
          action: this.toggleReferral,
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
            icon: emailsvg,
          },
          // {
          //   title: "Reset Password",
          //   action: this.resetUserPassword,
          //   icon: keysvg,
          // },
        ],
      },
      emailPopupOpen: false,
      referPopupOpen: false,
    };
  },

  methods: {
    openEmailComposition() {
      this.emailPopupOpen = true;
    },
    toggleReferral() {
      this.referPopupOpen = !this.referPopupOpen;
    },
    toggleEventAssignment() {
      this.eventAssignmentOpen = !this.eventAssignmentOpen;
    },
    closePopups() {
      this.emailPopupOpen = false;
      this.notesPopupOpen = false;
      this.referPopupOpen = false;
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
    ContactCardCompany,
    ContactPageToDoList,
    ContactPageUpcomingEvents,
    ContactPageAutomation,
    ContactPageNotes,
    MessagingSingleComponent,
    VendorPageReferralPopup,
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
  height: 35%;
}
#box-two {
  height: 32.5%;
}
#box-three {
  height: 32.5%;
}

#right-column {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#box-four {
  height: 17%;
}

#box-five {
  height: 42%;
  width: 100%;

  display: flex;
  flex-direction: row;
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