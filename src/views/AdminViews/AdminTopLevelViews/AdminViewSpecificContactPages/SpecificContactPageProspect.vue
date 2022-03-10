<template>
  <popup-email-composition
    v-if="popupOpen === 'send-email'"
    :contact="contact"
    @cancel-send-email="togglePopup"
  />
  <div id="section-wrapper">
    <div id="left-column">
      <div id="box-one">
        <prospect-page-card :prospect="contact" svg="person" />
      </div>
      <div id="box-two">
        <prospect-page-contact-health :prospect="contact" />
      </div>
      <div id="box-three">
        <!-- <contact-page-to-do-list :id="contact.userId" /> -->
      </div>
    </div>
    <div id="right-column">
      <div id="box-four">
        <four-button-bar-with-drop-down
          :buttons="buttons"
          :dropdown="dropdown"
          @button-clicked="togglePopup"
        />
      </div>
      <div id="box-five">
        <prospect-page-event-details :prospect="contact" />
      </div>
      <div id="box-six">
        <div id="box-six-half">
          <automation-list
            :automations="automations"
            automationType="Contact"
            :id="$route.params.id"
            @automation-deleted="deleteAutomation"
            @automation-approved="approveAutomation"
          />
        </div>
        <div id="box-six-half-two">
          <contact-page-notes
            :notes="contact.notes"
            :contact="contact"
            contactCategory="prospects"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AutomationList from "../../AdminComponents/AdminSharedComponents/AutomationList.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ProspectPageEventDetails from "../../AdminComponents/AdminContactPageComponents/ProspectPageComponents/ProspectPageEventDetails.vue";
import ProspectPageContactHealth from "../../AdminComponents/AdminContactPageComponents/ProspectPageComponents/ProspectPageContactHealth.vue";
import ProspectPageCard from "../../AdminComponents/AdminContactPageComponents/ProspectPageComponents/ProspectPageCard.vue";

export default {
  data() {
    return {
      buttons: [
        {
          title: "Send Email",
          action: this.openEmailComposition,
          icon: "email",
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
            icon: "fire",
          },
          {
            title: "neutral",
            action: this.changeProspectStatus,
            icon: "neutral",
          },
          {
            title: "cold",
            action: this.changeProspectStatus,
            icon: "snowflake",
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
      return this.$store.state.contacts.prospects.find((x) => x.userId == id);
    },
    contactStatus() {
      return this.contact.status ? this.contact.status : "Neutral";
    },
  },
  methods: {
    openEmailComposition() {
      this.emailPopupOpen = true;
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
    ContactPageNotes,


    AutomationList,
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