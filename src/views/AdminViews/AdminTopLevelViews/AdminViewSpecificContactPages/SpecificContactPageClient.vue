<template>
  <div id="section-wrapper" v-if="contact">
    <popup-email-composition
      v-if="emailPopupOpen"
      :contact="contact"
      @close-window="closePopups()"
    ></popup-email-composition>
    <div id="left-column">
      <div id="box-one">
        <contact-card-client
          :loading="contact ? false : true"
          :contact="contact"
          :icon="SVGs.PersonSVG"
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
            :icon="SVGs.CalendarSVG"
          ></client-page-upcoming-events>
        </div>
        <!-- <div id="box-five-half-two">
          <client-page-information-card
            :contact="contact"
            :icon="SVGs.InformationIconSVG"
          ></client-page-information-card>
        </div> -->
      </div>
      <div id="box-six">
        <div id="box-six-half">
          <contact-page-automation></contact-page-automation>
        </div>
        <div id="box-six-half-two">
          <base-card
            :icon="SVGs.MessageBubbleSVG"
            :loading="contact ? false : true"
          >
            <template v-slot:title>Messages</template>
            <template v-slot:content>
              <messaging-single-component
                v-if="conversation"
                :contact="contact"
                :conversation="conversation"
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
import ContactPageAutomation from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageAutomation.vue";
import ContactCardClient from "../../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ClientPageUpcomingEvents from "../../AdminComponents/AdminContactPageComponents/ClientPageComponents/ClientPageUpcomingEvents.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import SVGs from "../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      contact: undefined,
      thread: undefined,
      conversation: undefined,
      eventConversation: [],
      buttons: [
        {
          title: "Send Email",
          action: this.openEmailComposition,
          icon: SVGs.EmailSVG,
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
          {
            title: "Reset Password",
            action: this.resetPassword,
            icon: SVGs.KeySVG,
          },
        ],
      },
      emailPopupOpen: false,
      notesPopupOpen: false,
    };
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.user);
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
    closePopups() {
      this.emailPopupOpen = false;
      this.notesPopupOpen = false;
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
  /* height: 30%; */
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