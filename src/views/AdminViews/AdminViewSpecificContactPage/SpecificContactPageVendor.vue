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
          :icon="SVGs.PersonSVG"
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
          :icon="SVGs.CalendarSVG"
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
          <base-card :icon="SVGs.MessageBubbleSVG">
            <template v-slot:title>Messages</template>
            <template v-slot:content v-if="contact">
              <messaging-single-component
                v-if="contact"
                :defaultUser="contact"
                :conversation="conversation"
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
} from "./ContactPageComponents/contactPageIndex.js";

import PopupEmailComposition from "../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import MessagingSingleComponent from "../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ContactCardCompany from "./ContactPageComponents/ContactCardCompany.vue";
import VendorPageReferralPopup from "./ContactPageComponents/VendorPageComponents/VendorPageReferralPopup.vue";
import ContactPageNotes from "./ContactPageComponents/ContactPageNotes/ContactPageNotes.vue";
import SVGs from "../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      eventAssignmentOpen: false,
      contact: undefined,
      conversation: undefined,
      eventConversation: [],
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
            icon: SVGs.EmailSVG,
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
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
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
    getConversations(conversations) {
      return conversations.map((x) => {
        x = this.$store.dispatch("getThreadParticipants", x).then((res) => {
          console.log(res.Items);
          return res.Items;
        });
        return x;
      });
    },
    async getConversationUsers(conversation) {
      conversation.users = conversation.users.filter((x) => {
        return x !== this.currentUser.userId;
      });
      var promises = conversation.users.map((x) => {
        let correctCall = this.currentUser.role ? "nonAdminGetUser" : "getUser";
        return this.$store
          .dispatch(correctCall, x)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      });
      let users;
      return Promise.all(promises).then((res) => {
        users = res;
        return users;
      });
    },
    async getConversationMessages(conversation) {
      let thread = await this.$store
        .dispatch("getMessageThread", conversation.pk)
        .then((res) => {
          res.Items;
          return res.Items;
        });
      return thread;
    },
  },

  async created() {
    await this.$store
      .dispatch("adminGetContact", this.$route.params.id)
      .then((res) => {
        this.contact = res.data.Item;
        if (this.contact.conversations) {
          console.log("ey");
          let matchedItem = this.contact.conversations.find((x) => {
            return this.currentUser.conversations.includes(x);
          });
          if (matchedItem) {
            console.log("ho!");
            this.eventConversation.push(matchedItem);
          }
        }
        console.log(this.contact);
      });
    if (this.eventConversation) {
      Promise.all(this.getConversations(this.eventConversation)).then((res) => {
        let conversations = res;
        console.log(conversations);
        for (let index = 0; index < conversations.length; index++) {
          Promise.all([
            this.getConversationUsers(...conversations[index]),
            this.getConversationMessages(...conversations[index]),
          ]).then((res) => {
            let conversation = {
              ...conversations[index],
              thread: res[1],
              users: res[0],
            };
            this.conversation = conversation;
            console.log(conversation);
          });
        }
      });
    }
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
