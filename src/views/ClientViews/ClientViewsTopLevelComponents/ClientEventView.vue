<template>
  <div v-if="event" id="div-wrapper">
    <backdrop v-if="popupOpen" @click="togglePopup()"></backdrop>
    <invoice-popup
      :invoice="event.invoice"
      :event="event"
      :client="client"
      v-if="popupOpen === 'invoice'"
      @close-popup="togglePopup()"
    ></invoice-popup>
    <forms-popup
      v-if="popupOpen === 'forms'"
      @close-popup="togglePopup()"
      :forms="event.forms"
      :eventId="event.userId"
    ></forms-popup>
    <contract-popup
      v-if="popupOpen === 'contract'"
      @close-popup="togglePopup()"
      :contracts="event.contracts"
      :eventId="event.userId"
    ></contract-popup>

    <section>
      <div id="contact-card">
        <event-page-contact-card
          v-if="client && event"
          :client="client"
          :event="event"
        ></event-page-contact-card>
      </div>
      <div id="alerts">
        <event-page-alerts :alerts="eventAlerts"></event-page-alerts>
      </div>
      <div id="button-bar">
        <four-button-bar-with-drop-down
          :buttons="buttons"
        ></four-button-bar-with-drop-down>
      </div>
      <div id="location-scroller">
        <specific-event-page-location-scroller
          :event="event"
          :loading="locations ? false : true"
        ></specific-event-page-location-scroller>
      </div>
      <div id="make-payment">
        <event-make-payment-card
          :event="event"
          :eventId="event.userId"
        ></event-make-payment-card>
      </div>
      <div id="contact-carousel">
        <event-page-contact-carousel
          :contacts="contacts"
        ></event-page-contact-carousel>
      </div>
      <div id="to-do">
        <to-do-specific-event :event="event"></to-do-specific-event>
      </div>
      <div id="messages">
        <!-- <recent-messages-event v-if="contacts"></recent-messages-event> -->
        <recent-messages
          v-if="contacts"
          :conversationList="eventConversations"
        ></recent-messages>
      </div>
    </section>
  </div>
</template>

<script>
import ToDoSpecificEvent from "../../../SharedComponents/SharedComponentsEvents/ToDoSpecificEvent.vue";
// import RecentMessagesEvent from "../../../SharedComponents/SharedComponentsMessaging/RecentMessagesEvent.vue";
import RecentMessages from "../../../SharedComponents/SharedComponentsMessaging/RecentMessages.vue";
import EventPageContactCard from "../../../SharedComponents/SharedComponentsEvents/EventPageContactCard.vue";
import EventPageContactCarousel from "../../../SharedComponents/SharedComponentsEvents/eventPageContactCarousel/EventPageContactCarousel.vue";
import SpecificEventPageLocationScroller from "../../../SharedComponents/SharedComponentsEvents/specificEventPageLocationScroller/SpecificEventPageLocationScroller.vue";
import Backdrop from "../../../SharedComponents/SharedComponentsUI/Backdrop.vue";
import EventMakePaymentCard from "../../../SharedComponents/SharedComponentsEvents/EventMakePayment/EventMakePaymentCard.vue";
import FormsPopup from "../../../SharedComponents/SharedComponentsEvents/FormsPopup.vue";
import InvoicePopup from "../../../SharedComponents/SharedComponentsEvents/InvoicePopup.vue";
import ContractPopup from "../../../SharedComponents/SharedComponentsEvents/ContractPopup.vue";
import FourButtonBarWithDropDown from "../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import EventPageAlerts from "../../../SharedComponents/SharedComponentsEvents/EventPageAlerts.vue";
import SVGs from "../../../assets/SVGs/svgIndex.js";
import helpers from "../../../helpers.js";

export default {
  data() {
    return {
      SVGs,
      event: undefined,
      contacts: [],
      locations: [],
      clients: [],
      eventConversations: [],
      automations: undefined,
      buttons: [
        {
          title: "View Forms",
          action: this.openForms,
        },
        {
          title: "View Invoice",
          action: this.openInvoice,
        },
        {
          title: "View Contract",
          action: this.openContract,
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
            this.$store.state.businessSettings
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
        this.$store.state.businessSettings.payments.depositAmount * 100
      ) {
        alerts.push({
          urgency: "high",
          text: "Deposit Unpaid",
        });
      }
      return alerts;
    },
  },
  methods: {
    finalPaymentDueDate: helpers.finalPaymentDueDate,
    balanceOutstanding: helpers.balanceOutstanding,
    total: helpers.total,
    openForms() {
      this.togglePopup("forms");
    },
    openInvoice() {
      this.togglePopup("invoice");
    },
    openContract() {
      this.togglePopup("contract");
    },
    togglePopup(popup) {
      console.log(popup);
      if (this.popupOpen !== null) {
        this.popupOpen = null;
        this.backdropOpen = true;
      } else {
        this.popupOpen = popup;
        this.backdropOpen = true;
      }
    },
  },

  async created() {
    await this.$store
      .dispatch("getEvent", this.$route.params.eventId)
      .then((res) => {
        this.event = res.data.Item;
      })
      .catch((e) =>
        this.$store.commit("addStatus", { type: "error", note: e })
      );
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
    return this.event.contacts;
  },
  components: {
    ToDoSpecificEvent,
    // RecentMessagesEvent,
    RecentMessages,
    EventPageContactCard,
    EventPageContactCarousel,
    SpecificEventPageLocationScroller,
    EventPageAlerts,
    EventMakePaymentCard,
    Backdrop,
    InvoicePopup,
    FormsPopup,
    ContractPopup,
    FourButtonBarWithDropDown,
    // TwoButtonDialogModal,
  },
};
</script>

<style scoped>
#div-wrapper {
  width: 100%;
  height: 100%;
}

section {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: 35px repeat(6, 10%);
}

#contact-card {
  grid-column: 1 / 4;
  grid-row: 1 / 3;
}

#alerts {
  grid-column: 1/ 4;
  grid-row: 3/ 7;
}
#button-bar {
  grid-column: 4/ 11;
  grid-row: 1/ 3;
}

#location-scroller {
  grid-column: 4/ 7;
  grid-row: 3/7;
}

#make-payment {
  grid-column: 7 / 11;
  grid-row: 3/ 7;
}

#contact-carousel {
  grid-column: 1/ 5;
  grid-row: 7/ 11;
}

#to-do {
  grid-column: 5 / 8;
  grid-row: 7 / 11;
}

#messages {
  grid-column: 8 / 11;
  grid-row: 7 / 11;
}
</style>