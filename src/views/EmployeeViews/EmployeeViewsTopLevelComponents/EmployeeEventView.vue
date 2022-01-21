<template>
  <div v-if="event" id="div-wrapper">
    <backdrop v-if="popupOpen" @click="togglePopup()"></backdrop>
    <forms-popup
      v-if="popupOpen === 'forms'"
      @close-popup="togglePopup()"
      :forms="event.forms"
      :eventId="event.userId"
    ></forms-popup>

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
import FormsPopup from "../../../SharedComponents/SharedComponentsEvents/FormsPopup.vue";
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
    ToDoSpecificEvent,
    // RecentMessagesEvent,
    RecentMessages,
    EventPageContactCard,
    EventPageContactCarousel,
    SpecificEventPageLocationScroller,
    EventPageAlerts,
    Backdrop,
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
  }

  #messages {
    grid-column: 5 / 8;
    grid-row: 3 / 4;
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