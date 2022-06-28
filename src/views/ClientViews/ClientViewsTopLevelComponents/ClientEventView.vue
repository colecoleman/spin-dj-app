<template>
  <div id="div-wrapper">
    <Transition name="rise">
      <invoice
        :invoice="event.invoice"
        :event="event"
        :client="client"
        v-if="popupOpen === 'invoice'"
        @close="togglePopup"
      />
    </Transition>
    <Transition name="rise">
      <forms
        v-if="popupOpen === 'forms'"
        @close="togglePopup"
        :forms="event.forms"
        :event="event"
        :eventId="event.userId"
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
    <Transition name="rise">
      <event-make-payment
        v-if="popupOpen === 'make-payment'"
        :event="event"
        @close-popup="togglePopup"
      />
    </Transition>
    <section v-if="event">
      <event-page-contact-card id="contact-card" :event="event" />
      <event-information id="event-information" :event="event" />
      <four-button-bar-with-drop-down
        id="button-bar"
        :buttons="buttons"
        @button-clicked="togglePopup"
      />
      <location-gallery id="location-scroller" :event="event" />
      <event-page-alerts id="alerts" :alerts="eventAlerts" />
      <contact-list id="contact-carousel" :contacts="event.contacts" />
      <to-do-list
        id="to-do"
        listType="event"
        :event="event"
        :eventContacts="event.contacts"
      />
      <messaging id="messages" display="event" :contacts="event.contacts" />
    </section>
  </div>
</template>

<script>
import ToDoList from "../../../Components/SharedComponentsToDoList/ToDoList.vue";
// import MessagingEvent from "../../../Components/SharedComponentsMessaging/MessagingEvent.vue";
import Messaging from "../../../Components/SharedComponentsMessaging/Messaging.vue";
import EventPageContactCard from "../../../Components/SharedComponentsEvents/EventPageContactCard.vue";
// import EventPageContactCarousel from "../../../Components/SharedComponentsEvents/eventPageContactCarousel/EventPageContactCarousel.vue";
// import EventPageContactCard from "../../../Components/SharedComponentsEvents/EventPageContactCard.vue";
import EventMakePayment from "../../../Components/SharedComponentsEvents/EventMakePayment/EventMakePayment.vue";
import EventInformation from "../../../Components/AdminComponents/AdminEventPageComponents/EventInformation.vue";
import ContactList from "../../../Components/ContactList/EventContactList.vue";
import LocationGallery from "../../../Components/SharedComponentsEvents/EventPageLocationGallery/LocationGallery.vue";
// import EventMakePaymentCard from "../../../Components/SharedComponentsEvents/EventMakePayment/EventMakePaymentCard.vue";
import Forms from "../../../Components/SharedComponentsEvents/Forms.vue";
import Invoice from "../../../Components/SharedComponentsEvents/Invoice.vue";
import Contracts from "../../../Components/SharedComponentsEvents/Contracts.vue";
import FourButtonBarWithDropDown from "../../../Components/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import EventPageAlerts from "../../../Components/SharedComponentsEvents/EventPageAlerts.vue";
import {
  total,
  balanceOutstanding,
  finalPaymentDueDate,
} from "../../../helpers.js";

export default {
  data() {
    return {
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
      let clients = this.event.contacts.filter((x) => {
        if (x.role) {
          return x.role === "client";
        }
      });
      return clients[0];
    },
    event() {
      return this.$store.state.event;
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
      if (this.event) {
        if (this.event.contracts.some((e) => e.status !== "signed")) {
          alerts.push({
            urgency: "high",
            text: "Unsigned Contracts",
          });
        }
        let today = new Date();
        if (
          today >
            finalPaymentDueDate(
              this.event.data,
              this.$store.getters.finalPaymentSettings
            ) &&
          balanceOutstanding(this.event.invoice, this.event.data) > 0
        ) {
          alerts.push({
            urgency: "high",
            text: "Remaining Balance Due",
          });
        }
        if (
          total(this.event.invoice, this.event.data) -
            balanceOutstanding(this.event.invoice, this.event.data) <
          this.depositAmount * 100
        ) {
          alerts.push({
            urgency: "high",
            text: `${this.depositTerminology} Unpaid`,
          });
        }
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
    let event = await this.$store.dispatch("getEvent", key);
    this.$store.commit("setEvent", event);
    await this.$store.dispatch("getEventContacts", this.event);
    await this.$store.dispatch("getEventLocations", this.event);
  },
  components: {
    ToDoList,
    Messaging,
    EventPageContactCard,
    ContactList,
    EventMakePayment,
    EventInformation,
    LocationGallery,
    EventPageAlerts,
    // EventMakePaymentCard,
    Invoice,
    Forms,
    Contracts,
    FourButtonBarWithDropDown,
  },
};
</script>

<style scoped>
#div-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  color: var(--textColor);
}
section {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 75px 240px 1fr repeat(4, 275px) 335px;
  gap: 10px;
  z-index: 5;
}

#contact-card {
  z-index: 11;
  grid-row: 1 / 2;
}

#event-information {
  grid-row: 2/ 3;
}
#button-bar {
  grid-row: 3/ 4;
  z-index: 10;
}

#location-scroller {
  grid-row: 4/5;
}

#alerts {
  grid-row: 5/ 6;
}

#contact-carousel {
  width: 100%;
  grid-row: 6/ 7;
}

#to-do {
  grid-row: 8 / 9;
}

#messages {
  grid-row: 7 / 8;
  margin-bottom: 60px;
}
@media screen and (min-width: 775px) {
  section {
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: 75px 240px minmax(0, 1fr);
  }

  #contact-card {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
  }

  #event-information {
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

  #alerts {
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
    display: unset;
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