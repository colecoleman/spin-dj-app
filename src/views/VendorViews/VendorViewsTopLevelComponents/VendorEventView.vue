<template>
  <div v-if="event" id="div-wrapper">
    <forms
      v-if="popupOpen === 'forms'"
      @close="togglePopup"
      :event="event"
      :forms="event.forms"
      :eventId="event.userId"
    />
    <section>
      <div id="contact-card">
        <event-page-contact-card :event="event" />
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
        <location-gallery :event="event" />
      </div>
      <div id="make-payment"></div>
      <div id="contact-carousel">
        <contact-list :contacts="event.contacts" />
      </div>
      <div id="to-do">
        <to-do-list
          :eventContacts="event.contacts"
          listType="event"
          :event="event"
        />
      </div>
      <div id="messages">
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
import ContactList from "../../../SharedComponents/SharedComponentsEvents/EventPageContactList/EventPageContactList.vue";
import LocationGallery from "../../../SharedComponents/SharedComponentsEvents/EventPageLocationGallery/LocationGallery.vue";
import Forms from "../../../SharedComponents/SharedComponentsEvents/Forms.vue";
import FourButtonBarWithDropDown from "../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import EventPageAlerts from "../../../SharedComponents/SharedComponentsEvents/EventPageAlerts.vue";
import { balanceOutstanding, total } from "../../../helpers.js";

export default {
  data() {
    return {
      event: undefined,
      contacts: [],
      locations: [],
      clients: [],
      eventConversations: [],
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
      let clients = this.event.contacts.filter((x) => {
        return x.role === "client";
      });
      return clients[0];
    },
    eventAlerts() {
      let alerts = [];

      return alerts;
    },
  },
  methods: {
    balanceOutstanding,
    total,
    togglePopup(popup) {
      if (this.popupOpen !== null) {
        this.popupOpen = null;
      } else {
        this.popupOpen = popup;
      }
    },
  },

  async created() {
    let id = this.$route.params.eventId;
    if (!this.$store.state.user) {
      await this.$store.dispatch("setUser");
    }
    console.log(this.$route.params);
    let key = {
      userId: id,
      tenantId: this.$route.params.tenantId,
    };
    this.event = await this.$store.dispatch("getEvent", key);
    await this.$store.dispatch("getEventContacts", this.event);
    await this.$store.dispatch("getEventLocations", this.event);
  },
  components: {
    ToDoList,
    // RecentMessagesEvent,
    RecentMessages,
    EventPageContactCard,
    ContactList,
    LocationGallery,
    EventPageAlerts,
    Forms,
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
    grid-template-rows: 75px 240px 1fr repeat(3, 260px);
    gap: 10px;
    z-index: 5;
  }

  #contact-card {
    grid-row: 1 / 2;
  }

  #alerts {
    grid-row: 2/ 3;
  }
  #button-bar {
    grid-row: 3/ 4;
    z-index: 10;
  }

  #location-scroller {
    grid-row: 4/5;
  }

  #contact-carousel {
    grid-row: 5/ 6;
  }

  #to-do {
    grid-row: 6 / 7;
    padding-bottom: 60px;
  }

  #messages {
    /* grid-row: 3 / 4; */
    display: none;
  }
  @media (min-width: 800px) {
    #div-wrapper {
      width: 100%;
      height: 100%;
    }

    section {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: 75px 240px 1fr;
      gap: 10px;
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
      grid-column: 4/ 8;
      grid-row: 2/3;
    }

    #make-payment {
      grid-column: 7 / 11;
      grid-row: 2/ 3;
    }

    #contact-carousel {
      width: 100%;
      grid-column: 1/ 5;
      grid-row: 3/ 4;
    }

    #to-do {
      grid-column: 8 / 11;
      grid-row: 2 / 4;
      padding: 0;
    }

    #messages {
      display: unset;
      grid-column: 5 / 8;
      grid-row: 3 / 4;
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