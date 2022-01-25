<template>
  <div v-if="event" id="div-wrapper">
    <!-- <backdrop
      v-if="invoiceOpen || formsOpen || contractOpen"
      @click="closePopup()"
    ></backdrop> -->
    <invoice-popup
      :invoice="event.invoice"
      :event="event"
      :client="client"
      v-if="invoiceOpen"
      @close-popup="closePopup()"
    ></invoice-popup>
    <popup-modal
      title="Make Payment"
      v-if="paymentModalOpen"
      @close-popup="closePopup()"
    >
      <template v-slot:window>
        <event-make-payment
          :eventId="event.userId"
          :event="event"
        ></event-make-payment>
      </template>
    </popup-modal>
    <popup-modal
      title="Edit Products"
      v-if="editProductsModalOpen"
      @close-popup="closePopup()"
    >
      <template v-slot:window>
        <event-edit-products
          :products="event.invoice.products"
          @add-product-to-event="addProductToEvent"
          @remove-product-from-event="removeProductFromEvent"
          @save-products="invoiceSaveProducts"
        ></event-edit-products>
      </template>
    </popup-modal>
    <forms-popup
      v-if="formsOpen"
      @close-popup="closePopup()"
      @add-form-to-event="addFormToEvent"
      @delete-form="deleteForm"
      :forms="event.forms"
      :eventId="event.userId"
    ></forms-popup>
    <contract-popup
      v-if="contractOpen"
      @close-popup="closePopup()"
      :contracts="event.contracts"
      :eventId="event.userId"
    ></contract-popup>
    <two-button-dialog-modal
      v-if="deleteEventOpen"
      @select-button-one="confirmDeleteEvent()"
      @select-button-two="closePopup()"
      @close-modal="closePopup()"
    ></two-button-dialog-modal>
    <section>
      <div id="contact-card">
        <event-page-contact-card
          v-if="client && event"
          :client="client"
          :event="event"
          @edit-event="editEvent"
        ></event-page-contact-card>
      </div>
      <div id="location-scroller">
        <specific-event-page-location-scroller
          :event="event"
          :loading="locations ? false : true"
        ></specific-event-page-location-scroller>
      </div>
      <div id="button-bar">
        <four-button-bar-with-drop-down
          :buttons="buttons"
          :dropdown="dropdown"
        ></four-button-bar-with-drop-down>
      </div>
      <div id="event-information">
        <event-information
          :event="event"
          :eventId="event.userId"
        ></event-information>
      </div>
      <div id="automation">
        <automation-list
          :automations="automations"
          :contacts="contacts"
          automationType="Event"
          :id="$route.params.id"
        ></automation-list>
      </div>
      <div id="contact-carousel">
        <event-page-contact-carousel
          :contacts="contacts"
          :event="event"
        ></event-page-contact-carousel>
      </div>
      <div id="to-do">
        <to-do-specific-event :event="event"></to-do-specific-event>
      </div>
      <div id="recent-messages">
        <recent-messages
          :conversationList="eventConversations"
        ></recent-messages>
      </div>
    </section>
  </div>
</template>

<script>
import ToDoSpecificEvent from "../../../SharedComponents/SharedComponentsEvents/ToDoSpecificEvent.vue";
import RecentMessages from "../../../SharedComponents/SharedComponentsMessaging/RecentMessages.vue";
import EventPageContactCard from "../../../SharedComponents/SharedComponentsEvents/EventPageContactCard.vue";
import EventPageContactCarousel from "../../../SharedComponents/SharedComponentsEvents/eventPageContactCarousel/EventPageContactCarousel.vue";
import SpecificEventPageLocationScroller from "../../../SharedComponents/SharedComponentsEvents/specificEventPageLocationScroller/SpecificEventPageLocationScroller.vue";
import AutomationList from "../AdminComponents/AdminSharedComponents/AutomationList.vue";
// import Backdrop from "../../../SharedComponents/SharedComponentsUI/Backdrop.vue";
import FormsPopup from "../../../SharedComponents/SharedComponentsEvents/FormsPopup.vue";
import InvoicePopup from "../../../SharedComponents/SharedComponentsEvents/InvoicePopup.vue";
import EventInformation from "../AdminComponents/AdminEventPageComponents/EventInformation.vue";
import EventMakePayment from "../../../SharedComponents/SharedComponentsEvents/EventMakePayment/EventMakePayment.vue";
import PopupModal from "../../../SharedComponents/SharedComponentsUI/PopupModal.vue";
import ContractPopup from "../../../SharedComponents/SharedComponentsEvents/ContractPopup.vue";
import FourButtonBarWithDropDown from "../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import TwoButtonDialogModal from "../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";
import EventEditProducts from "../AdminComponents/AdminEventPageComponents/EventEditProducts.vue";
import _ from "lodash";

import SVGs from "../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
      event: undefined,
      contacts: [],
      locations: [],
      clients: [],
      automations: [],
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
          {
            title: "Make Payment",
            action: this.processPayment,
            danger: false,
          },
          {
            title: "Edit Products",
            action: this.editProducts,
            danger: false,
          },
        ],
      },
      deleteEventOpen: false,
      backdropOpen: false,
      contractOpen: false,
      paymentModalOpen: false,
      editProductsModalOpen: true,
      invoiceOpen: false,
      formsOpen: false,
    };
  },
  computed: {
    client() {
      return this.clients[0];
    },
    currentUser() {
      return this.$store.state.user;
    },
    eventConversations() {
      return this.contacts.map((x) => {
        if (x.conversations) {
          return x.conversations.find((x) => {
            return this.currentUser.conversations.includes(x);
          });
        }
      });
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
    deleteEvent() {
      this.deleteEventOpen = true;
    },
    processPayment() {
      this.paymentModalOpen = true;
    },
    editProducts() {
      this.editProductsModalOpen = true;
    },
    async confirmDeleteEvent() {
      let contacts = [...this.contacts];
      contacts.forEach((contact) => {
        if (contact) {
          let index = contact.associatedEvents.indexOf(this.event.userId);
          if (index > -1) {
            let payload = {
              clientId: contact.userId,
              variable: "associatedEvents",
              value: index,
              operation: "removeFromList",
            };
            this.$store
              .dispatch("editContact", payload)
              .then(() => {
                this.$store.commit("addStatus", {
                  type: "success",
                  note: "Event Removed From Contact",
                });
              })
              .catch((e) => {
                this.$store.commit("addStatus", { type: "error", note: e });
              });
          }
        }
      });
      await this.$store.dispatch("deleteEvent", this.event.userId);
      this.$router.push("/admin/dashboard");
    },
    closePopup() {
      this.contractOpen = false;
      this.invoiceOpen = false;
      this.formsOpen = false;
      this.backdropOpen = false;
      this.deleteEventOpen = false;
      this.paymentModalOpen = false;
      this.editProductsModalOpen = false;
    },
    addFormToEvent(form) {
      this.event.forms.push(_.cloneDeep(form));
      let payload = {
        variable: "forms",
        value: this.event.forms,
        eventId: this.event.userId,
      };
      this.$store.dispatch("editEvent", payload);
    },
    deleteForm(form) {
      this.event.forms.splice(form, 1);
      let payload = {
        variable: "forms",
        value: this.event.forms,
        eventId: this.event.userId,
      };
      this.$store.dispatch("editEvent", payload);
    },
    addProductToEvent(product) {
      console.log(product);
      this.event.invoice.products.push(_.cloneDeep(product));
      let payload = {
        variable: "invoice",
        value: this.event.invoice,
        eventId: this.event.userId,
      };
      this.$store.dispatch("editEvent", payload);
    },
    removeProductFromEvent(product) {
      this.event.invoice.products.splice(product, 1);
      let payload = {
        variable: "invoice",
        value: this.event.invoice,
        eventId: this.event.userId,
      };
      this.$store.dispatch("editEvent", payload);
    },
    invoiceSaveProducts() {
      let payload = {
        variable: "invoice",
        value: this.event.invoice,
        eventId: this.event.userId,
      };
      this.$store.dispatch("editEvent", payload);
    },
    editEvent(payload) {
      this.event = payload;
    },
  },

  async created() {
    await this.$store
      .dispatch("adminGetEvent", this.$route.params.id)
      .then((res) => {
        this.event = res.data.Item;
        console.log(this.event);
      })
      .catch((e) =>
        this.$store.commit("addStatus", { type: "error", note: e })
      );
    await this.event.contacts.forEach((contact) => {
      let id = contact.id ? contact.id : contact;
      this.$store.dispatch("getUser", id).then((res) => {
        this.contacts.push(res);
        if (contact.role === "client") {
          this.clients.push(res);
        }
      });
    });
    await this.event.locations.forEach((location) => {
      this.$store.dispatch("getLocation", location).then((res) => {
        this.locations.push(res.Item);
      });
    });
  },
  components: {
    ToDoSpecificEvent,
    RecentMessages,
    EventPageContactCard,
    EventPageContactCarousel,
    SpecificEventPageLocationScroller,
    AutomationList,
    EventMakePayment,
    // Backdrop,
    InvoicePopup,
    PopupModal,
    EventInformation,
    FormsPopup,
    ContractPopup,
    FourButtonBarWithDropDown,
    TwoButtonDialogModal,
    EventEditProducts,
  },
};
</script>

<style scoped>
@media screen {
  #div-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
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

  #location-scroller {
    grid-column: 1/ 4;
    grid-row: 2/ 3;
  }

  #button-bar {
    grid-column: 4/ 11;
    grid-row: 1/ 2;
  }

  #event-information {
    grid-column: 4/ 7;
    grid-row: 2/3;
  }

  #automation {
    grid-column: 7 / 11;
    grid-row: 2/ 3;
  }

  #contact-carousel {
    width: 100%;
    grid-column: 1/ 5;
    grid-row: 3/ 4;
  }

  #to-do {
    grid-column: 5 / 8;
    grid-row: 3 / 4;
  }

  #recent-messages {
    grid-column: 8 / 11;
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
