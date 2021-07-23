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
        <prospect-page-card
          :prospect="contact"
          :icon="personsvg"
        ></prospect-page-card>
      </div>
      <div id="box-two">
        <prospect-page-contact-health
          :prospect="contact"
        ></prospect-page-contact-health>
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
        <prospect-page-event-details
          :prospect="contact"
        ></prospect-page-event-details>
      </div>
      <div id="box-six">
        <div id="box-six-half">
          <contact-page-automation></contact-page-automation>
        </div>
        <div id="box-six-half-two">
          <contact-page-notes
            :notes="contact.notes"
            :contact="contact"
            contactCategory="prospects"
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

import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import PopupNotesView from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupNotesView.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ProspectPageEventDetails from "../ContactPageComponents/ProspectPageComponents/ProspectPageEventDetails.vue";
import ProspectPageContactHealth from "../ContactPageComponents/ProspectPageComponents/ProspectPageContactHealth.vue";
import ProspectPageCard from "../ContactPageComponents/ProspectPageComponents/ProspectPageCard.vue";
import personsvg from "../../../../assets/SVGs/person.svg";
import messageBubble from "../../../../assets/SVGs/message-bubble.svg";
import calendarsvg from "../../../../assets/SVGs/calendar.svg";
import clipboardsvg from "../../../../assets/SVGs/clipboard.svg";
import automationsvg from "../../../../assets/SVGs/automation.svg";
import emailsvg from "../../../../assets/SVGs/email.svg";
import firesvg from "../../../../assets/SVGs/fire.svg";
import snowflakesvg from "../../../../assets/SVGs/snowflake.svg";
import neutralsvg from "../../../../assets/SVGs/neutral.svg";

export default {
  data() {
    return {
      personsvg,
      messageBubble,
      calendarsvg,
      clipboardsvg,
      automationsvg,
      firesvg,
      snowflakesvg,
      neutralsvg,
      buttons: [
        {
          title: "Send Email",
          action: this.openEmailComposition,
          icon: emailsvg,
        },
        {
          title: "Send Proposal",
          action: this.sendProposal,
        },
        {
          title: "Jump To Source",
          action: this.jumpToSource,
        },
      ],
      dropdown: {
        title: "Status",
        actionItems: [
          {
            title: "hot",
            action: this.changeProspectStatus,
            icon: firesvg,
          },
          {
            title: "neutral",
            action: this.changeProspectStatus,
            icon: neutralsvg,
          },
          {
            title: "cold",
            action: this.changeProspectStatus,
            icon: snowflakesvg,
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
      return this.$store.state.contacts.prospects.find((x) => x.id == id);
    },
    contactStatus() {
      let id = this.$route.params.id;
      console.log(
        this.$store.state.contacts.prospects.find((x) => x.id == id).status
      );
      return this.$store.state.contacts.prospects.find((x) => x.id == id)
        .status;
    },
  },
  methods: {
    addToDo() {
      console.log("clicked!");
    },
    getStatus() {},
    openEmailComposition() {
      this.emailPopupOpen = true;
    },
    viewNotes() {
      console.log("notes open");
    },
    changeProspectStatus(status) {
      let payload = {
        status: status,
        id: this.contact.id,
      };
      this.$store.commit("changeProspectStatus", payload);
    },
    closePopups() {
      this.emailPopupOpen = false;
      this.notesPopupOpen = false;
    },
  },
  created() {},

  components: {
    PopupEmailComposition,
    PopupNotesView,
    ContactPageNotes,

    ContactPageToDoList,
    ContactPageAutomation,
    ProspectPageEventDetails,
    ProspectPageContactHealth,
    ProspectPageCard,
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
  height: 30%;
}
#box-two {
  height: 30%;
  display: flex;
  flex-direction: column;
}

#box-three {
  height: 40%;
}
#right-column {
  width: 70%;
  height: calc(100% - 5px);
}

#box-four {
  height: 18%;
  width: 100%;
}

#box-five {
  height: 44%;
  width: 100%;
}

#box-six {
  height: 37%;
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