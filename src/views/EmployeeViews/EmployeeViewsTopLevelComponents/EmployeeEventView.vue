<template>
  <div v-if="event" id="div-wrapper">
    <forms
      v-if="popupOpen === 'forms'"
      @close="togglePopup"
      :forms="event.forms"
      :event="event"
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
        <location-gallery :event="event" :locations="event.locations" />
      </div>

      <div id="contact-carousel">
        <contact-list :contacts="event.contacts" />
      </div>
      <div id="to-do">
        <to-do-list
          listType="event"
          :eventContacts="event.contacts"
          :event="event"
        />
      </div>
      <div id="messages">
        <messaging display="event" :contacts="event.contacts" />
      </div>
    </section>
  </div>
</template>

<script>
import ToDoList from "../../../Components/SharedComponentsToDoList/ToDoList.vue";
// import MessagingEvent from "../../../Components/SharedComponentsMessaging/MessagingEvent.vue";
import Messaging from "../../../Components/SharedComponentsMessaging/Messaging.vue";
import EventPageContactCard from "../../../Components/SharedComponentsEvents/EventPageContactCard.vue";
import ContactList from "../../../Components/ContactList/EventContactList.vue";
import LocationGallery from "../../../Components/SharedComponentsEvents/EventPageLocationGallery/LocationGallery.vue";
import Forms from "../../../Components/SharedComponentsEvents/Forms.vue";
import FourButtonBarWithDropDown from "../../../Components/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import EventPageAlerts from "../../../Components/SharedComponentsEvents/EventPageAlerts.vue";

export default {
  data() {
    return {
      event: undefined,
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
    // MessagingEvent,
    Messaging,
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
    grid-template-rows: 75px 240px 1fr repeat(4, 275px) 360px;
    gap: 10px;
    z-index: 5;
  }

  #contact-card {
    z-index: 11;
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
    width: 100%;
    grid-row: 5/ 6;
  }

  #to-do {
    grid-row: 6 / 7;
  }

  #messages {
    grid-row: 7/8;
    padding-bottom: 60px;

    /* display: none; */
    /* grid-row: 3 / 4; */
  }
  @media (min-width: 775px) {
    section {
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: 75px 240px minmax(0, 1fr);
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
      padding: 0;
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