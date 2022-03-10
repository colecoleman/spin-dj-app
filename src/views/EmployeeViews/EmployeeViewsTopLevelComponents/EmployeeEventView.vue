<template>
  <div v-if="event" id="div-wrapper">
    <forms-popup
      v-if="popupOpen === 'forms'"
      @close-popup="togglePopup()"
      :forms="event.forms"
      :eventId="event.userId"
    />

    <section>
      <div id="contact-card">
        <event-page-contact-card
          v-if="client && event"
          :client="client"
          :event="event"
        />
      </div>
      <div id="alerts">
        <event-page-alerts :alerts="eventAlerts" />
      </div>
      <div id="button-bar">
        <four-button-bar-with-drop-down
          :buttons="buttons"
          @button-clicked="togglePopup"
        />
      </div>
      <div id="location-scroller">
        <specific-event-page-location-scroller
          :event="event"
          :loading="locations ? false : true"
        />
      </div>

      <div id="contact-carousel">
        <event-page-contact-carousel :contacts="contacts" />
      </div>
      <div id="to-do">
        <to-do-list
          v-if="contacts"
          listType="event"
          :eventContacts="contacts"
          :event="event"
        />
      </div>
      <div id="messages">
        <!-- <recent-messages-event v-if="contacts"></recent-messages-event> -->
        <recent-messages
          v-if="contacts"
          :conversationList="eventConversations"
        />
      </div>
    </section>
  </div>
</template>

<script>
import ToDoList from "../../../SharedComponents/SharedComponentsToDoList/ToDoList.vue";
// import RecentMessagesEvent from "../../../SharedComponents/SharedComponentsMessaging/RecentMessagesEvent.vue";
import RecentMessages from "../../../SharedComponents/SharedComponentsMessaging/RecentMessages.vue";
import EventPageContactCard from "../../../SharedComponents/SharedComponentsEvents/EventPageContactCard.vue";
import EventPageContactCarousel from "../../../SharedComponents/SharedComponentsEvents/eventPageContactCarousel/EventPageContactCarousel.vue";
import SpecificEventPageLocationScroller from "../../../SharedComponents/SharedComponentsEvents/specificEventPageLocationScroller/SpecificEventPageLocationScroller.vue";
import FormsPopup from "../../../SharedComponents/SharedComponentsEvents/FormsPopup.vue";
import FourButtonBarWithDropDown from "../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import EventPageAlerts from "../../../SharedComponents/SharedComponentsEvents/EventPageAlerts.vue";

export default {
  data() {
    return {
      event: undefined,
      contacts: [],
      locations: [],
      clients: [],
      eventConversations: [],
      automations: undefined,
      buttons: [
        {
          title: "View Forms",
          parameter: "forms",
        },
      ],
      popupOpen: null,
    };
  },
  computed: {
    client() {
      return this.clients[0];
    },
    eventAlerts() {
      let alerts = [];

      return alerts;
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
  },

  async created() {
    if (!this.$store.state.user) {
      await this.$store.dispatch("setUser").then((res) => {
        console.log(this.$store.state.user);
        console.log(res);
      });
    }
    await this.$store
      .dispatch("getEvent", this.$route.params.eventId)
      .then((res) => {
        console.log(res);
        this.event = res.data.Item;
      })
      .catch((e) => {
        console.log(e);
        this.$store.commit("addStatus", { type: "error", note: e });
      });
    if (this.event) {
      await this.event.contacts.forEach((contact) => {
        this.$store.dispatch("nonAdminGetUser", contact.id).then((res) => {
          this.contacts.push(res);
          if (res.role === "client") {
            this.clients.push(res);
          }
          if (res.conversations) {
            let matchedItem = res.conversations.find((x) => {
              return this.$store.state.user.conversations.includes(x);
            });
            if (matchedItem) {
              this.eventConversations.push(matchedItem);
            }
          }
        });
      });
    }
    return this.event.contacts;
  },
  components: {
    ToDoList,
    // RecentMessagesEvent,
    RecentMessages,
    EventPageContactCard,
    EventPageContactCarousel,
    SpecificEventPageLocationScroller,
    EventPageAlerts,
    FormsPopup,
    FourButtonBarWithDropDown,
    // TwoButtonDialogModal,
  },
};
</script>

<style scoped>
@media screen {
  #div-wrapper {
    width: 100%;
    height: 100%;
  }

  section {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 75px 240px 1fr repeat(4, 275px);
    gap: 10px;
  }

  #contact-card {
    grid-row: 1 / 2;
  }

  #alerts {
    grid-row: 2/ 3;
  }
  #button-bar {
    grid-row: 3/ 4;
  }

  #location-scroller {
    grid-row: 4/5;
  }

  #contact-carousel {
    width: 100%;
    grid-row: 5/ 6;
  }

  #to-do {
    grid-row: 6 / 7;
    padding-bottom: 60px;
  }

  #messages {
    display: none;
    /* grid-row: 3 / 4; */
  }
  @media (min-width: 775px) {
    section {
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: 75px 240px 1fr;
    }

    #contact-card {
      grid-column: 1 / 4;
      grid-row: 1 / 2;
    }

    #alerts {
      grid-column: 1/ 4;
      grid-row: 2/ 3;
    }
    #button-bar {
      grid-column: 4/ 11;
      grid-row: 1/ 2;
    }

    #location-scroller {
      grid-column: 4/ 7;
      grid-row: 2/3;
    }

    #contact-carousel {
      grid-column: 1/ 5;
      grid-row: 3/ 4;
    }

    #to-do {
      grid-column: 5 / 8;
      grid-row: 3 / 4;
      padding: 0;
    }

    #messages {
      grid-column: 8 / 11;
      grid-row: 3 / 4;
      display: unset;
    }
  }
}

@media print {
  #div-wrapper {
    width: unset;
    height: auto;
    overflow: visible !important;
    display: block;
  }

  section {
    display: none;
  }
}
</style>