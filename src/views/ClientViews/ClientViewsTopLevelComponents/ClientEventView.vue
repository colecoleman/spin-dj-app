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

    <forms
      v-if="popupOpen === 'forms'"
      @close="togglePopup"
      :forms="event.forms"
      :event="event"
      :eventId="event.userId"
    />

    <Transition name="rise">
      <contracts
        v-if="popupOpen === 'contract'"
        @close="togglePopup()"
        :contacts="event.contacts"
        :event="event"
        :locations="event.locations"
      />
    </Transition>
    <section v-if="event">
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
      <div id="make-payment">
        <event-make-payment-card :event="event" :eventId="event.userId" />
      </div>
      <div id="contact-carousel">
        <contact-list :contacts="event.contacts" />
      </div>
      <div id="to-do">
        <to-do-list
          listType="event"
          :event="event"
          :eventContacts="event.contacts"
        />
      </div>
      <div id="messages">
        <recent-messages :conversationList="eventConversations" />
      </div>
    </section>
  </div>
</template>

<script>
import ToDoList from "../../../SharedComponents/SharedComponentsToDoList/ToDoList.vue";
// import RecentMessagesEvent from "../../../SharedComponents/SharedComponentsMessaging/RecentMessagesEvent.vue";
import RecentMessages from "../../../SharedComponents/SharedComponentsMessaging/RecentMessages.vue";
import EventPageContactCard from "../../../SharedComponents/SharedComponentsEvents/EventPageContactCard.vue";
// import EventPageContactCarousel from "../../../SharedComponents/SharedComponentsEvents/eventPageContactCarousel/EventPageContactCarousel.vue";
import ContactList from "../../../SharedComponents/SharedComponentsEvents/EventPageContactList/EventPageContactList.vue";
import LocationGallery from "../../../SharedComponents/SharedComponentsEvents/EventPageLocationGallery/LocationGallery.vue";
import EventMakePaymentCard from "../../../SharedComponents/SharedComponentsEvents/EventMakePayment/EventMakePaymentCard.vue";
import Forms from "../../../SharedComponents/SharedComponentsEvents/Forms.vue";
import Invoice from "../../../SharedComponents/SharedComponentsEvents/Invoice.vue";
import Contracts from "../../../SharedComponents/SharedComponentsEvents/Contracts.vue";
import FourButtonBarWithDropDown from "../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import EventPageAlerts from "../../../SharedComponents/SharedComponentsEvents/EventPageAlerts.vue";
import {
  total,
  balanceOutstanding,
  finalPaymentDueDate,
} from "../../../helpers.js";

export default {
  data() {
    return {
      // event: undefined,
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
    RecentMessages,
    EventPageContactCard,
    ContactList,
    LocationGallery,
    EventPageAlerts,
    EventMakePaymentCard,
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
  grid-template-rows: 75px 240px 1fr repeat(4, 275px);
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

#make-payment {
  grid-row: 5/ 6;
}

#contact-carousel {
  width: 100%;
  grid-row: 6/ 7;
}

#to-do {
  grid-row: 7 / 8;
  padding-bottom: 60px;
}

#messages {
  display: none;
  /* grid-row: 3 / 4; */
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