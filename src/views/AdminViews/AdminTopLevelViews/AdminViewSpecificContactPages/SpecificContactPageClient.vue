<template>
  <popup-email-composition
    v-if="popupOpen === 'send-email'"
    :contact="contact"
    @close-window="togglePopup()"
  />
  <popup-modal
    title="Reset User Password"
    @close-popup="togglePopup()"
    v-if="popupOpen === 'reset-password'"
  >
    <template v-slot:window>
      <div class="reset-user-password-wrapper">
        <h5>Choose New Password:</h5>
        <input type="text" placeholder="password" v-model="newUserPassword" />
        <div class="button-wrapper">
          <button-standard-with-icon
            text="Submit New Password"
            @click="resetPassword"
          />
        </div>
        <p>Password must contain:</p>
        <ul>
          <li>
            <p>At least one lowercase letter</p>
          </li>
          <li>
            <p>At least one capital letter</p>
          </li>
          <li>
            <p>At least one number</p>
          </li>
          <li>
            <p>At least one symbol (e.g.: $, *, !, @, #)</p>
          </li>
        </ul>
      </div>
    </template>
  </popup-modal>
  <section>
    <div id="contact-card">
      <contact-card-client
        :loading="contact ? false : true"
        :contact="contact"
        :icon="SVGs.PersonSVG"
        @email-contact="openEmailComposition"
      />
    </div>
    <div id="to-do">
      <contact-page-to-do-list :contact="contact" />
    </div>
    <div id="notes">
      <contact-page-notes
        :contact="contact"
        :notesPrivate="contact.notesPrivate"
        :notesPublic="contact.notesPublic"
        v-if="contact"
      />
    </div>

    <div id="button-bar">
      <four-button-bar-with-drop-down
        :buttons="buttons"
        :dropdown="dropdown"
        @button-clicked="togglePopup"
      />
    </div>

    <div id="upcoming-events">
      <client-page-upcoming-events
        :contact="contact"
        :icon="SVGs.CalendarSVG"
      />
    </div>
    <!-- <div id="box-five-half-two">
          <client-page-information-card
            :contact="contact"
            :icon="SVGs.InformationIconSVG"
          ></client-page-information-card>
        </div> -->
    <div id="automation">
      <automation-list
        :automations="automations"
        :contacts="[contact]"
        automationType="Contact"
        :id="$route.params.id"
      />
    </div>
    <div id="messages">
      <base-card
        :icon="SVGs.MessageBubbleSVG"
        :loading="contact ? false : true"
        title="Coming Soon"
      >
        <template v-slot:content>
          <!-- <messaging-single-component
            v-if="conversation"
            :contact="contact"
            :conversation="conversation"
          ></messaging-single-component> -->
        </template>
      </base-card>
    </div>
  </section>
</template>

<script>
import ContactPageToDoList from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageToDoList.vue";
import AutomationList from "../../AdminComponents/AdminSharedComponents/AutomationList.vue";
import ContactCardClient from "../../../../SharedComponents/SharedComponentsContact/ContactCardPerson.vue";
import PopupEmailComposition from "../../../../SharedComponents/SharedComponentsPopupUtilities/PopupEmailComposition.vue";
import PopupModal from "../../../../SharedComponents/SharedComponentsUI/PopupModal.vue";
// import MessagingSingleComponent from "../../../../SharedComponents/SharedComponentsMessaging/MessagingSingleComponent.vue";
import FourButtonBarWithDropDown from "../../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import ClientPageUpcomingEvents from "../../AdminComponents/AdminContactPageComponents/ClientPageComponents/ClientPageUpcomingEvents.vue";
import ContactPageNotes from "../../AdminComponents/AdminContactPageComponents/AdminContactPageSharedComponents/ContactPageNotes/ContactPageNotes.vue";
import SVGs from "../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      automations: [],
      contact: undefined,
      thread: undefined,
      conversation: undefined,
      newUserPassword: undefined,
      eventConversation: [],
      popupOpen: null,
      buttons: [
        {
          title: "Send Email",
          parameter: "send-email",
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
            action: this.initiateResetPassword,
            icon: SVGs.KeySVG,
          },
        ],
      },
      emailPopupOpen: false,
      notesPopupOpen: false,
      resetPasswordPopupOpen: false,
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

    initiateResetPassword() {
      this.resetPasswordPopupOpen = true;
    },
    async resetPassword() {
      var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (re.test(this.newUserPassword)) {
        this.newUserPasswordError = false;
        let payload = {
          username: this.contact.username,
          password: this.newUserPassword,
          userId: this.contact.userId,
        };
        await this.$store.dispatch("resetUserPassword", payload);
        this.togglePopup();
      } else {
        this.newUserPasswordError = true;
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
        if (this.contact.conversations) {
          let matchedItem = this.contact.conversations.find((x) => {
            return this.currentUser.conversations.includes(x);
          });
          if (matchedItem) {
            this.eventConversation.push(matchedItem);
          }
        }
      });
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
    ContactCardClient,
    ContactPageToDoList,
    ClientPageUpcomingEvents,
    PopupModal,
    // ClientPageInformationCard,
    AutomationList,
    // MessagingSingleComponent,
    ContactPageNotes,
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

.button-wrapper {
  /* width: 70%; */
  margin: auto;
  padding: 20px;
}

.reset-user-password-wrapper {
  margin: 50px;
}

p {
  text-align: left;
}
</style>