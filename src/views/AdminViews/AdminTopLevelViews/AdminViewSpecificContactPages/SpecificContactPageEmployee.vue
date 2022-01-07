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
        <upcoming-events
          :events="events"
          :pastEvents="pastEvents"
          v-if="!eventAssignmentOpen && eventsLoaded"
        ></upcoming-events>
      </div>
      <div id="box-six">
        <div id="box-six-half">
          <automation-list
            :automations="automations"
            automationType="Contact"
            :id="$route.params.id"
            @automation-deleted="deleteAutomation"
            @automation-approved="approveAutomation"
          ></automation-list>
        </div>
        <div id="box-six-half-two">
          <base-card :icon="SVGs.MessageBubbleSVG">
            <template v-slot:title>Messages</template>
            <template v-slot:content>
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
import UpcomingEvents from "../../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEvents.vue";
import ContactPageToDoList from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageToDoList.vue";
import AutomationList from "../../AdminComponents/AdminSharedComponents/AutomationList.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import ContactCardPerson from "../../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
import EmployeePageAvailabilityManager from "../../AdminComponents/AdminContactPageComponents/EmployeePageComponents/EmployeePageAvailabilityManager/EmployeePageAvailabilityManager.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
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
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
  },
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
    EmployeePageAvailabilityManager,
    ContactCardPerson,
    ContactPageToDoList,
    UpcomingEvents,
    AutomationList,
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