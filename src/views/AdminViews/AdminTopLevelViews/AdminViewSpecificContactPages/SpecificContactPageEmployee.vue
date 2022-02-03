<template>
  <popup-email-composition
    v-if="popupOpen === 'send-email'"
    :contact="contact"
    @close-window="togglePopup"
  />
  <employee-page-availability-manager
    v-if="popupOpen === 'availability-manager'"
    :employee="contact"
    @close-popup="togglePopup"
  />
  <section>
    <div id="contact-card">
      <contact-card-person :contact="contact" :icon="SVGs.PersonSVG" />
    </div>
    <div id="to-do">
      <contact-page-to-do-list :contact="contact" />
    </div>
    <div id="notes">
      <contact-page-notes :contact="contact" />
    </div>

    <div id="button-bar">
      <four-button-bar-with-drop-down
        :buttons="buttons"
        :dropdown="dropdown"
        @button-clicked="togglePopup"
        @dropdown-button-clicked="togglePopup"
      />
    </div>
    <div id="upcoming-events">
      <upcoming-events
        :events="events"
        :pastEvents="pastEvents"
        v-if="!eventAssignmentOpen"
      />
      <contact-page-events-assignment
        v-if="eventAssignmentOpen"
        :events="events"
        :contact="contact"
        :icon="SVGs.CalendarSVG"
        @event-assignment-toggle="toggleEventAssignment()"
      />
    </div>

    <div id="automation">
      <automation-list
        :automations="automations"
        automationType="Contact"
        :contacts="[contact]"
        :id="$route.params.id"
        @automation-deleted="deleteAutomation"
        @automation-approved="approveAutomation"
      />
    </div>
    <div id="messages">
      <base-card :icon="SVGs.MessageBubbleSVG" title="Coming Soon">
        <template v-slot:content>
          <!-- <messaging-single-component
            v-if="contact"
            :defaultUser="contact"
            :conversation="conversation"
            :id="contact.userId"
          ></messaging-single-component> -->
        </template>
      </base-card>
    </div>
  </section>
</template>

<script>
import UpcomingEvents from "../../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEvents.vue";
import ContactPageEventsAssignment from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageUpcomingEvents/ContactPageEventsAssignment.vue";
import ContactPageToDoList from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageToDoList.vue";
import AutomationList from "../../AdminComponents/AdminSharedComponents/AutomationList.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import ContactCardPerson from "../../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
import EmployeePageAvailabilityManager from "../../AdminComponents/AdminContactPageComponents/EmployeePageComponents/EmployeePageAvailabilityManager/EmployeePageAvailabilityManager.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
// import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import SVGs from "../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      contact: undefined,
      events: [],
      pastEvents: [],
      eventAssignmentOpen: false,
      conversation: undefined,
      eventConversation: [],
      popupOpen: null,
      buttons: [
        {
          title: "Send Email",
          parameter: "send-email",
        },
        {
          title: "Assign Events",
          action: this.toggleEventAssignment,
        },
        {
          title: "Availability",
          parameter: "availability-manager",
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
          //   action: this.resetPassword,
          //   icon: keysvg,
          // },
        ],
      },
      availabilityManagerOpen: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    togglePopup(popup) {
      if (this.popupOpen !== null) {
        this.popupOpen = null;
      } else {
        this.popupOpen = popup;
      }
    },

    toggleEventAssignment() {
      this.eventAssignmentOpen = !this.eventAssignmentOpen;
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
    EmployeePageAvailabilityManager,
    ContactPageEventsAssignment,
    ContactCardPerson,
    ContactPageToDoList,
    UpcomingEvents,
    AutomationList,
    ContactPageNotes,
    // MessagingSingleComponent,
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
#to-do {
  grid-column: 1 / 3;
  grid-row: 3 / 6;
}

#notes {
  grid-column: 1 / 3;
  grid-row: 6 / 10;
}
#messages {
  grid-column: 7/10;
  grid-row: 6/ 10;
}

#button-bar {
  grid-column: 3/ 10;
  grid-row: 1/ 2;
}

#upcoming-events {
  grid-column: 3/ 7;
  grid-row: 2/10;
}

#automation {
  grid-column: 7 / 10;
  grid-row: 2/ 6;
}
</style>