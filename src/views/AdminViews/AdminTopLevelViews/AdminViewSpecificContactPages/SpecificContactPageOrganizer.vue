<template>
  <popup-email-composition
    v-if="emailPopupOpen && !notesPopupOpen"
    :contact="contact"
    @closeWindow="toggleEmailComposition()"
  ></popup-email-composition>
  <div id="section-wrapper">
    <div id="left-column">
      <div id="box-one">
        <contact-card-person
          v-if="contact"
          :contact="contact"
          :icon="SVGs.PersonSVG"
        ></contact-card-person>
      </div>
      <div id="box-two">
        <contact-page-notes
          v-if="contact"
          :contact="contact"
        ></contact-page-notes>
      </div>
      <div id="box-three">
        <contact-page-to-do-list
          v-if="contact"
          :contact="contact"
        ></contact-page-to-do-list>
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
          <base-card :icon="SVGs.MessageBubbleSVG" title="Messages">
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
import ContactPageToDoList from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageToDoList.vue";
import AutomationList from "../../AdminComponents/AdminSharedComponents/AutomationList.vue";
import UpcomingEvents from "../../../../SharedComponents/SharedComponentsUpcomingEvents/UpcomingEvents.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import ContactCardPerson from "../../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import SVGs from "../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      contact: undefined,
      eventAssignmentOpen: false,
      events: [],
      pastEvents: [],
      eventsLoaded: false,
      conversation: undefined,
      eventConversation: [],
      buttons: [
        {
          title: "Send Email",
          action: this.toggleEmailComposition,
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
            action: this.toggleEmailComposition,
            icon: SVGs.EmailSVG,
          },
        ],
      },
      emailPopupOpen: false,
      notesPopupOpen: false,
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
    toggleEmailComposition() {
      this.emailPopupOpen = !this.emailPopupOpen;
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
    ContactCardPerson,
    ContactPageNotes,
    ContactPageToDoList,
    UpcomingEvents,

    MessagingSingleComponent,

    FourButtonBarWithDropDown,
    AutomationList,
  },
};
</script>

<style scoped>
#section-wrapper {
  width: 100%;
  /* height: 95%; */
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
}
#box-two {
  height: 40%;
}

#box-three {
  flex-grow: 1;
}

#right-column {
  width: 70%;
  /* height: calc(100% - 5px); */
}
#box-four {
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