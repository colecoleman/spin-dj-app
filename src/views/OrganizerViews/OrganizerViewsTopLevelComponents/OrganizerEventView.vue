<template>
  <div v-if="event" id="div-wrapper">
    <Transition name="rise">
      <invoice
        :invoice="event.invoice"
        :event="event"
        :client="client"
        v-if="popupOpen === 'invoice'"
        @close="togglePopup()"
      />
    </Transition>
    <Transition name="rise">
      <forms
        v-if="popupOpen === 'forms'"
        @close="togglePopup()"
        :forms="event.forms"
        :event="event"
        :eventId="event.userId"
      />
    </Transition>
    <Transition name="rise">
      <event-make-payment
        v-if="popupOpen === 'make-payment'"
        :event="event"
        @close-popup="togglePopup"
      />
    </Transition>
    <Transition name="rise">
      <contracts
        v-if="popupOpen === 'contract'"
        @close="togglePopup()"
        :contacts="event.contacts"
        :event="event"
        :locations="event.locations"
      />
    </Transition>

    <section>
      <div id="contact-card">
        <event-page-contact-card :event="event" />
      </div>
      <div id="alerts">
        <event-information :event="event" />
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
      <div id="make-payment">
        <event-page-alerts :alerts="eventAlerts" />
        <!-- <event-make-payment-card :event="event" :eventId="event.userId" /> -->
      </div>
      <div id="contact-carousel">
        <contact-list :contacts="event.contacts" />
      </div>
      <div id="to-do">
        <to-do-list
          :eventContacts="event.contacts"
          :event="event"
          listType="event"
        />
      </div>
      <div id="messages">
        <!-- <messaging-event v-if="contacts"></messaging-event> -->
        <messaging :display="events" :contacts="event.contacts" />
      </div>
    </section>
  </div>
</template>

<script>
import ToDoList from "../../../Components/SharedComponentsToDoList/ToDoList.vue";
// import MessagingEvent from "../../../Components/SharedComponentsMessaging/MessagingEvent.vue";
import Messaging from "../../../Components/SharedComponentsMessaging/Messaging.vue";
import EventPageContactCard from "../../../Components/SharedComponentsEvents/EventPageContactCard.vue";
import EventMakePayment from "../../../Components/SharedComponentsEvents/EventMakePayment/EventMakePayment.vue";
import EventInformation from "../../../Components/AdminComponents/AdminEventPageComponents/EventInformation.vue";
// import EventMakePaymentCard from "../../../Components/SharedComponentsEvents/EventMakePayment/EventMakePaymentCard.vue";
import Forms from "../../../Components/SharedComponentsEvents/Forms.vue";
import Invoice from "../../../Components/SharedComponentsEvents/Invoice.vue";
import Contracts from "../../../Components/SharedComponentsEvents/Contracts.vue";
import FourButtonBarWithDropDown from "../../../Components/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import EventPageAlerts from "../../../Components/SharedComponentsEvents/EventPageAlerts.vue";
import {
  finalPaymentDueDate,
  balanceOutstanding,
  total,
} from "../../../helpers.js";
import ContactList from "../../../Components/ContactList/EventContactList.vue";
import LocationGallery from "../../../Components/SharedComponentsEvents/EventPageLocationGallery/LocationGallery.vue";

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
        {
          title: "View Invoice",
          parameter: "invoice",
        },
        {
          title: "View Contract",
          parameter: "contract",
        },
        {
          title: "Make Payment",
          parameter: "make-payment",
        },
      ],
      popupOpen: null,
    };
  },
  computed: {
    client() {
      return this.clients[0];
    },
    businessSettings() {
      return this.$store.state.businessSettings;
    },
    depositAmount() {
      if (this.$store.getters.depositType === "percentage") {
        return (
          this.$store.getters.depositAmount *
          0.01 *
          this.total(this.event.invoice, this.event.data)
        );
      } else {
        return this.$store.getters.depositAmount;
      }
    },
    depositTerminology() {
      return this.$store.getters.depositTerminology;
    },
    eventAlerts() {
      let alerts = [];
      if (this.event.contracts.some((e) => e.status !== "signed")) {
        alerts.push({
          urgency: "high",
          text: "Unsigned Contracts",
        });
      }
      let today = new Date();
      if (
        today >
          this.finalPaymentDueDate(
            this.event.data,
            this.$store.getters.finalPaymentSettings
          ) &&
        this.balanceOutstanding(this.event.invoice, this.event.data) > 0
      ) {
        alerts.push({
          urgency: "high",
          text: "Remaining Balance Due",
        });
      }
      if (
        this.total(this.event.invoice, this.event.data) -
          this.balanceOutstanding(this.event.invoice, this.event.data) <
        this.depositAmount * 100
      ) {
        alerts.push({
          urgency: "high",
          text: `${this.depositTerminology} Unpaid`,
        });
      }
      return alerts;
    },
  },
  methods: {
    finalPaymentDueDate,
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
    // MessagingEvent,
    Messaging,
    EventPageContactCard,
    ContactList,
    LocationGallery,
    EventPageAlerts,
    EventInformation,
    EventMakePayment,
    Invoice,
    Forms,
    Contracts,
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

  #make-payment {
    grid-row: 5/ 6;
  }

  #contact-carousel {
    width: 100%;
    grid-row: 6/ 7;
  }

  #to-do {
    grid-row: 7 / 8;
  }

  #messages {
    grid-row: 8/9;
    padding-bottom: 60px;
    /* display: none; */
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

    #make-payment {
      grid-column: 7 / 11;
      grid-row: 2/ 3;
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

.rise-enter-active,
.rise-leave-active {
  transition: all 1s ease;
}

.rise-enter-from,
.rise-leave-to {
  opacity: 0;
  position: fixed;
  margin-top: 100%;
  left: 0;
}
</style>