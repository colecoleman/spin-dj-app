<template>
  <div v-if="event" id="div-wrapper">
    <backdrop
      v-if="invoiceOpen || formsOpen || contractOpen"
      @click="closePopup()"
    ></backdrop>
    <invoice-popup
      :invoice="event.invoice"
      :event="event"
      :client="client"
      v-if="invoiceOpen"
      @close-popup="closePopup()"
    ></invoice-popup>
    <forms-popup
      v-if="formsOpen"
      @close-popup="closePopup()"
      :forms="event.forms"
      :eventId="event.userId"
    ></forms-popup>
    <contract-popup
      v-if="contractOpen"
      @close-popup="closePopup()"
      :contracts="event.contracts"
      :eventId="event.userId"
    ></contract-popup>

    <section>
      <div id="upper-div">
        <div id="upper-div-left-container">
          <event-page-contact-card
            v-if="client && event"
            :client="client"
            :event="event"
          ></event-page-contact-card>
        </div>
        <div id="upper-div-right-container">
          <div id="upper-div-right-upper-container">
            <four-button-bar-with-drop-down
              :buttons="buttons"
              :dropdown="dropdown"
            ></four-button-bar-with-drop-down>
          </div>
          <div id="upper-div-right-lower-container">
            <div id="upper-div-right-lower-container-box-1">
              <specific-event-page-location-scroller
                :locations="locations"
                :loading="locations ? false : true"
              ></specific-event-page-location-scroller>
            </div>
            <div id="upper-div-right-lower-container-box-2">
              <event-page-alerts :alerts="eventAlerts"></event-page-alerts>
            </div>
          </div>
        </div>
      </div>
      <div id="lower-div">
        <div id="lower-div-box-1">
          <event-page-contact-carousel
            :contacts="contacts"
          ></event-page-contact-carousel>
        </div>
        <div id="lower-div-box-2">
          <to-do-specific-event :event="event"></to-do-specific-event>
        </div>
        <div id="lower-div-box-3">
          <recent-messages-event v-if="contacts"></recent-messages-event>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ToDoSpecificEvent from "../../../SharedComponents/SharedComponentsEvents/ToDoSpecificEvent.vue";
import RecentMessagesEvent from "../../../SharedComponents/SharedComponentsMessaging/RecentMessagesEvent.vue";
import EventPageContactCard from "../../../SharedComponents/SharedComponentsEvents/EventPageContactCard.vue";
import EventPageContactCarousel from "../../../SharedComponents/SharedComponentsEvents/eventPageContactCarousel/EventPageContactCarousel.vue";
import SpecificEventPageLocationScroller from "../../../SharedComponents/SharedComponentsEvents/specificEventPageLocationScroller/SpecificEventPageLocationScroller.vue";
// import AutomationEventComponent from "../AdminViewsSharedComponents/Automation/AutomationComponents/AutomationEventComponent.vue";
import Backdrop from "../../../SharedComponents/SharedComponentsUI/Backdrop.vue";
import FormsPopup from "../../../SharedComponents/SharedComponentsEvents/FormsPopup.vue";
import InvoicePopup from "../../../SharedComponents/SharedComponentsEvents/InvoicePopup.vue";
import ContractPopup from "../../../SharedComponents/SharedComponentsEvents/ContractPopup.vue";
import FourButtonBarWithDropDown from "../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
// import TwoButtonDialogModal from "../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";
import EventPageAlerts from "../../../SharedComponents/SharedComponentsEvents/EventPageAlerts.vue";
import SVGs from "../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      event: undefined,
      contacts: [],
      locations: [],
      clients: [],
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

      dropdown: {
        title: "Actions",
        actionItems: [
          {
            title: "delete",
            action: this.deleteEvent,
            danger: true,
            icon: SVGs.TrashCanSVG,
          },
        ],
      },
      deleteEventOpen: false,
      backdropOpen: false,
      contractOpen: false,
      invoiceOpen: false,
      formsOpen: false,
    };
  },
  computed: {
    client() {
      return this.clients[0];
    },
    eventAlerts() {
      let alerts = [];
      if (this.event.contracts.some((e) => e.status === "signed")) {
        alerts.push({
          urgency: "high",
          text: "Unsigned Contracts",
        });
      }
      return alerts;
    },
  },
  methods: {
    openForms() {
      this.formsOpen = true;
      this.backdropOpen = true;
    },
    openInvoice() {
      this.invoiceOpen = true;
      this.backdropOpen = true;
    },
    openContract() {
      this.contractOpen = true;
      this.backdropOpen = true;
    },

    closePopup() {
      this.contractOpen = false;
      this.invoiceOpen = false;
      this.formsOpen = false;
      this.backdropOpen = false;
    },
    editEvent() {
      alert("edited!");
    },
    postponeEvent() {
      alert("postponed");
    },
  },

  async created() {
    await this.$store
      .dispatch("getEvent", this.$route.params.eventId)
      .then((res) => {
        this.event = res.data.Item;
        console.log(this.event);
      })
      .catch((e) => this.$store.dispatch("addError", e));
    await this.event.contacts.forEach((contact) => {
      this.$store.dispatch("nonAdminGetUser", contact).then((res) => {
        this.contacts.push(res.data.Item);
        if (res.data.Item.role === "client") {
          this.clients.push(res.data.Item);
        }
      });
    });
    await this.event.locations.forEach((location) => {
      this.$store.dispatch("getLocation", location).then((res) => {
        this.locations.push(res.Item);
        console.log(this.locations);
      });
    });
    return this.event.contacts;
  },
  components: {
    ToDoSpecificEvent,
    RecentMessagesEvent,
    EventPageContactCard,
    EventPageContactCarousel,
    SpecificEventPageLocationScroller,
    EventPageAlerts,
    // AutomationEventComponent,
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
  display: flex;
  flex-direction: column;
}

#upper-div {
  height: 55%;
  width: 100%;
  display: flex;
  flex-direction: row;
}

#upper-div-left-container {
  height: 100%;
  width: 30%;
  display: flex;
}

#upper-div-right-container {
  width: 70%;
  height: 100%;
}

#upper-div-right-upper-container {
  width: 100%;
  /* height: 30%; */
  display: flex;
  flex-direction: row;
}

#upper-div-right-lower-container {
  width: 100%;
  height: 70%;
  display: flex;
}

#upper-div-right-lower-container-box-1 {
  height: 100%;
  width: 45%;
  display: flex;
}

#upper-div-right-lower-container-box-2 {
  height: 100%;
  width: 55%;
  display: flex;
}

#lower-div {
  height: 45%;
  width: 100%;
  min-width: 100%;
  display: flex;
  justify-content: stretch;
  justify-items: stretch;
}

#lower-div-box-1 {
  max-width: 40%;
  min-width: 40%;
  width: 40%;
  height: 100%;
  display: flex;
}

#lower-div-box-2 {
  max-width: 30%;
  min-width: 30%;
  height: 100%;
  display: flex;
}

#lower-div-box-3 {
  width: 30%;
  min-width: 30%;
  height: 100%;
  display: flex;
}

svg {
  fill: white;
}
</style>