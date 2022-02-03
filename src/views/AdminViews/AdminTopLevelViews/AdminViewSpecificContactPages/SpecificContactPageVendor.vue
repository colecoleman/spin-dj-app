<template>
  <popup-email-composition
    v-if="popupOpen === 'send-email'"
    :contact="contact"
    @closeWindow="togglePopup"
  ></popup-email-composition>
  <!-- <vendor-page-referral-popup
    v-if="referPopupOpen && !emailPopupOpen && !notesPopupOpen"
    :vendor="contact"
    @close-referral-window="closePopups()"
  ></vendor-page-referral-popup> -->
  <section>
    <div id="contact-card">
      <contact-card-person :contact="contact"></contact-card-person>
    </div>
    <div id="company-card">
      <contact-card-company
        :contact="contact"
        v-if="contact"
        :icon="SVGs.PersonSVG"
      ></contact-card-company>
    </div>
    <div id="messages">
      <base-card
        :icon="SVGs.MessageBubbleSVG"
        title="Coming Soon"
        v-if="contact"
        :subtitle="`${contact.given_name}`"
      >
        <template v-slot:content v-if="contact">
          <!-- <messaging-single-component
            v-if="contact"
            :defaultUser="contact"
            :conversation="conversation"
            :id="contact.userId"
          ></messaging-single-component> -->
        </template>
      </base-card>
    </div>

    <div id="button-bar">
      <four-button-bar-with-drop-down
        :buttons="buttons"
        :dropdown="dropdown"
        @button-clicked="togglePopup"
        @dropdown-button-clicked="togglePopup"
      ></four-button-bar-with-drop-down>
    </div>

    <div id="upcoming-events">
      <upcoming-events
        :events="events"
        :pastEvents="pastEvents"
        v-if="!eventAssignmentOpen && eventsLoaded"
      ></upcoming-events>
      <contact-page-events-assignment
        v-if="eventAssignmentOpen"
        :events="events"
        :contact="contact"
        :icon="SVGs.CalendarSVG"
        @event-assignment-toggle="toggleEventAssignment()"
      ></contact-page-events-assignment>
    </div>
    <div id="to-do">
      <contact-page-to-do-list :contact="contact"></contact-page-to-do-list>
    </div>
    <div id="automation">
      <automation-list
        :automations="automations"
        :contacts="[$route.params.id]"
        automationType="Contact"
        :id="$route.params.id"
        @automation-deleted="deleteAutomation"
        @automation-approved="approveAutomation"
      ></automation-list>
    </div>
    <div id="notes">
      <contact-page-notes :contact="contact" />
    </div>
  </section>
</template>

<script>
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import ContactCardPerson from "../../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
// import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import UpcomingEvents from "../../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEvents.vue";
import ContactPageEventsAssignment from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageUpcomingEvents/ContactPageEventsAssignment.vue";
import ContactCardCompany from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactCardCompany.vue";
import ContactPageToDoList from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageToDoList.vue";
import AutomationList from "../../AdminComponents/AdminSharedComponents/AutomationList.vue";
// import VendorPageReferralPopup from "../../AdminComponents/AdminContactPageComponents/VendorPageComponents/VendorPageReferralPopup.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import SVGs from "../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      eventAssignmentOpen: false,
      popupOpen: null,
      contact: {},
      events: [],
      eventsLoaded: false,
      pastEvents: [],
      conversation: undefined,
      eventConversation: [],
      buttons: [
        {
          title: "Send Email",
          parameter: "send-email",
        },
        // {
        //   title: "Refer Vendor",
        //   action: this.toggleReferral,
        // },
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
            // action: this.openEmailComposition,
            parameter: "send-email",
            icon: SVGs.EmailSVG,
          },
          // {
          //   title: "Reset Password",
          //   action: this.resetUserPassword,
          //   icon: keysvg,
          // },
        ],
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    toggleEventAssignment() {
      this.eventAssignmentOpen = !this.eventAssignmentOpen;
    },
    togglePopup(popup) {
      if (this.popupOpen !== null) {
        this.popupOpen = null;
      } else {
        this.popupOpen = popup;
      }
    },
    getConversations(conversations) {
      return conversations.map((x) => {
        x = this.$store.dispatch("getThreadParticipants", x).then((res) => {
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
        console.log(this.contact);
        if (this.contact.conversations) {
          let matchedItem = this.contact.conversations.find((x) => {
            return this.currentUser.conversations.includes(x);
          });
          if (matchedItem) {
            this.eventConversation.push(matchedItem);
          }
        }
      });
    for (
      let index = 0;
      index < [...new Set(this.contact.associatedEvents)].length;
      index++
    ) {
      const event = this.contact.associatedEvents[index];
      await this.$store.dispatch("adminGetEvent", event).then((res) => {
        let today = new Date();
        if (new Date(res.data.Item.data.date) < today) {
          this.pastEvents.push(res.data.Item);
        } else {
          this.events.push(res.data.Item);
        }
      });
    }

    this.eventsLoaded = true;
    if (this.eventConversation) {
      Promise.all(this.getConversations(this.eventConversation)).then((res) => {
        let conversations = res;
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
          });
        }
      });
    }
  },
  components: {
    PopupEmailComposition,
    ContactCardCompany,
    ContactCardPerson,
    UpcomingEvents,
    ContactPageToDoList,
    ContactPageEventsAssignment,
    AutomationList,
    ContactPageNotes,
    // MessagingSingleComponent,
    // VendorPageReferralPopup,
    FourButtonBarWithDropDown,
  },
};
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(100px, 250px) repeat(8, 1fr);
  grid-template-rows: 75px minmax(30px, 50px) repeat(7, 1fr);
  gap: 10px;
}

#contact-card {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

#company-card {
  grid-column: 1/3;
  grid-row: 3/4;
}

#messages {
  grid-column: 1/ 3;
  grid-row: 4/ 10;
}

#button-bar {
  grid-column: 3/ 10;
  grid-row: 1/ 2;
}

#upcoming-events {
  grid-column: 3/ 7;
  grid-row: 2/6;
}

#to-do {
  grid-column: 7 / 10;
  grid-row: 2 / 7;
}

#automation {
  grid-column: 3 / 7;
  grid-row: 6/ 10;
}

#notes {
  grid-column: 7 / 10;
  grid-row: 7 / 10;
}
</style>
