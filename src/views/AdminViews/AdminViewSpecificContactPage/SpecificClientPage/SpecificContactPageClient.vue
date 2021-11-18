<template>
  <popup-email-composition
    v-if="emailPopupOpen"
    :contact="contact"
    @close-window="closePopups()"
  ></popup-email-composition>

  <div id="section-wrapper">
    <div id="left-column">
      <div id="box-one">
        <contact-card-client
          :loading="contact ? false : true"
          :contact="contact"
          :icon="personsvg"
        ></contact-card-client>
      </div>
      <div id="box-two">
        <contact-page-to-do-list :contact="contact"></contact-page-to-do-list>
      </div>
      <div id="box-three">
        <contact-page-notes
          :contact="contact"
          :notesPrivate="contact.notesPrivate"
          :notesPublic="contact.notesPublic"
          v-if="contact"
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
        <div id="box-five-half-one">
          <client-page-upcoming-events
            :contact="contact"
            :icon="calendarsvg"
          ></client-page-upcoming-events>
        </div>
        <!-- <div id="box-five-half-two">
          <client-page-information-card
            :contact="contact"
            :icon="informationicon"
          ></client-page-information-card>
        </div> -->
      </div>
      <div id="box-six">
        <div id="box-six-half">
          <contact-page-automation></contact-page-automation>
        </div>
        <div id="box-six-half-two">
          <base-card :icon="messageBubble" :loading="contact ? false : true">
            <template v-slot:title>Messages</template>
            <template v-slot:content>
              <messaging-single-component
                v-if="contact"
                :contact="contact"
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
} from "../ContactPageComponents/contactPageIndex.js";

import ContactCardClient from "../ContactPageComponents/ContactCardPerson.vue";
import ClientPageUpcomingEvents from "../ContactPageComponents/ClientPageComponents/ClientPageUpcomingEvents.vue";
// import ClientPageInformationCard from "../ContactPageComponents/ClientPageComponents/ClientPageInformationCard.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";

import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ContactPageNotes from "../ContactPageComponents/ContactPageNotes/ContactPageNotes.vue";
import {
  personsvg,
  messageBubble,
  calendarsvg,
  clipboardsvg,
  automationsvg,
  emailsvg,
  informationicon,
  keysvg,
} from "../../../../assets/SVGs/person.svg";

export default {
  data() {
    return {
      personsvg,
      contact: undefined,
      messageBubble,
      calendarsvg,
      clipboardsvg,
      automationsvg,
      keysvg,
      informationicon,
      buttons: [
        {
          title: "Send Email",
          action: this.openEmailComposition,
          icon: emailsvg,
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
    };
  },
  methods: {
    addToDo() {
      console.log("clicked!");
    },
    openEmailComposition() {
      this.emailPopupOpen = true;
    },
    closePopups() {
      this.emailPopupOpen = false;
      this.notesPopupOpen = false;
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
    ContactCardClient,
    ContactPageToDoList,
    ClientPageUpcomingEvents,
    // ClientPageInformationCard,
    ContactPageAutomation,
    MessagingSingleComponent,
    ContactPageNotes,
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
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

#box-one {
  height: 30%;
}
#box-two {
  height: 30%;
  flex-grow: 1;
}

#box-three {
  height: 40%;
  flex-grow: 1;
}

#right-column {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#box-four {
  height: 18%;
}

#box-five {
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
}

#box-five-half-one {
  width: 100%;
}

/* #box-five-half-two {
  width: 40%;
} */

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