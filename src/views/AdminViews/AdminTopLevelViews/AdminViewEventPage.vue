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
      v-if="popupOpen === 'invoice'"
      @close-popup="togglePopup"
    />
    <popup-modal
      title="Edit Adjustments"
      v-if="popupOpen === 'adjustments'"
      @close-popup="togglePopup"
    >
      <template v-slot:window>
        <h4>Event Adjustments:</h4>
        <p v-if="!event.invoice.adjustments.length">
          This event has no adjustments!
        </p>

        <div
          v-for="(adjustment, index) in event.invoice.adjustments"
          :key="index"
          class="row-flex"
        >
          <vue-svg
            svg="x-icon"
            :customStyle="svgStyling"
            @clicked="removeAdjustment(index)"
          />
          <p>{{ adjustment.name }}: {{ adjustmentDisplay(adjustment) }}</p>
        </div>
        <h4>Add Adjustments:</h4>
        <div
          v-for="(adjustment, index) in this.$store.state.businessSettings
            .product.discounts"
          :key="index"
          class="row-flex"
        >
          <vue-svg
            svg="plus-sign"
            @clicked="addAdjustment(adjustment)"
            :customStyle="svgStyling"
          />
          <p>{{ adjustment.name }}: {{ adjustmentDisplay(adjustment) }}</p>
        </div>
        <button-standard-with-icon text="Save Event" @click="saveAdjustments" />
      </template>
    </popup-modal>
    <popup-modal
      title="Make Payment"
      v-if="popupOpen === 'payment'"
      @close-popup="togglePopup"
    >
      <template v-slot:window>
        <event-make-payment
          :eventId="event.userId"
          :event="event"
          @apply-manual-payment="applyManualPayment"
        />
      </template>
    </popup-modal>
    <popup-modal
      title="Edit Products"
      v-if="popupOpen === 'edit-products'"
      @close-popup="togglePopup"
    >
      <template v-slot:window>
        <event-edit-products
          :products="event.invoice.products"
          @add-product-to-event="addProductToEvent"
          @remove-product-from-event="removeProductFromEvent"
          @save-products="invoiceSaveProducts"
        />
      </template>
    </popup-modal>
    <forms-popup
      v-if="popupOpen === 'forms'"
      @close-popup="togglePopup"
      @add-form-to-event="addFormToEvent"
      @delete-form="deleteForm"
      :forms="event.forms"
      :eventId="event.userId"
      :eventTitle="event.title"
    />
    <contract-popup
      v-if="popupOpen === 'contract'"
      @close-popup="togglePopup"
      :contacts="contacts"
      :contracts="event.contracts"
      :event="event"
      :eventId="event.userId"
      :locations="locations"
    />
    <two-button-dialog-modal
      v-if="popupOpen === 'delete-event'"
      @select-button-one="confirmDeleteEvent()"
      @select-button-two="togglePopup"
      @close-modal="togglePopup"
    />
    <section>
      <div id="contact-card">
        <event-page-contact-card
          v-if="client && event"
          :client="client"
          :event="event"
          @edit-event="editEvent"
        />
      </div>
      <div id="location-scroller">
        <specific-event-page-location-scroller :event="event" />
      </div>
      <div id="button-bar">
        <four-button-bar-with-drop-down
          :buttons="buttons"
          :dropdown="dropdown"
          @button-clicked="togglePopup"
          @dropdown-button-clicked="togglePopup"
        />
      </div>
      <div id="event-information">
        <event-information :event="event" :eventId="event.userId" />
      </div>
      <div id="automation">
        <automation-list
          :automations="automations"
          :contacts="contacts"
          automationType="Event"
          :id="$route.params.id"
        />
      </div>
      <div id="contact-carousel">
        <event-page-contact-carousel :contacts="contacts" :event="event" />
      </div>
      <div id="to-do">
        <to-do-list :event="event" :eventContacts="contacts" listType="event" />
      </div>
      <div id="recent-messages">
        <recent-messages :conversationList="eventConversations" />
      </div>
    </section>
  </div>
</template>

<script>
import ToDoList from "../../../SharedComponents/SharedComponentsToDoList/ToDoList.vue";
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

import VueSvg from "../../../assets/VueSvg.vue";

export default {
  data() {
    return {
      svgStyling: "height: 14px; margin: 10px;",
      event: undefined,
      contacts: [],
      locations: [],
      clients: [],
      automations: [],
      buttons: [
        {
          title: "Forms",
          parameter: "forms",
        },
        {
          title: "Invoice",
          parameter: "invoice",
        },
        {
          title: "Contract",
          parameter: "contract",
        },
      ],

      dropdown: {
        title: "Actions",
        actionItems: [
          {
            title: "delete",
            // action: this.deleteEvent,
            parameter: "delete-event",
            danger: true,
            icon: "trash-can",
          },
          {
            title: "Payments",
            parameter: "payment",
            // action: this.processPayment,
            danger: false,
          },
          {
            title: "Adjustments",
            parameter: "adjustments",
            danger: false,
          },
          {
            title: "Edit Products",
            parameter: "edit-products",
            // action: this.editProducts,
            danger: false,
          },
        ],
      },
      popupOpen: undefined,
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
    togglePopup(popup) {
      if (this.popupOpen !== null) {
        this.popupOpen = null;
      } else {
        this.popupOpen = popup;
      }
    },
    adjustmentDisplay(adjustment) {
      if (adjustment.type === "percentage") {
        return `${adjustment.amount * 100}%`;
      }
      if (adjustment.type === "dollar") {
        return `$${adjustment.amount / 100}`;
      }
    },
    removeAdjustment(index) {
      this.event.invoice.adjustments.splice(index, 1);
    },
    addAdjustment(adjustment) {
      this.event.invoice.adjustments.push(adjustment);
    },
    saveAdjustments() {
      let payload = {
        variable: "invoice",
        value: this.event.invoice,
        eventId: this.event.userId,
      };
      this.$store.dispatch("editEvent", payload);
      this.togglePopup();
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
    applyManualPayment(payment) {
      console.log(payment);
      this.event.invoice.payments.push(payment);
      console.log(this.event);
      let payload = {
        variable: "invoice",
        value: this.event.invoice,
        eventId: this.event.userId,
      };
      this.$store.dispatch("editEvent", payload);
      this.togglePopup();
    },
  },

  async created() {
    await this.$store
      .dispatch("adminGetEvent", this.$route.params.id)
      .then((res) => {
        this.event = res.data.Item;
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
    ToDoList,
    RecentMessages,
    EventPageContactCard,
    EventPageContactCarousel,
    SpecificEventPageLocationScroller,
    AutomationList,
    EventMakePayment,
    InvoicePopup,
    PopupModal,
    EventInformation,
    FormsPopup,
    ContractPopup,
    FourButtonBarWithDropDown,
    TwoButtonDialogModal,
    EventEditProducts,
    VueSvg,
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

.row-flex {
  display: flex;
  align-items: center;
}

section {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 75px 150px repeat(4, 1fr);
  gap: 10px;
}

#contact-card {
  grid-row: 1 / 2;
}
#event-information {
  grid-row: 2/3;
}

#location-scroller {
  grid-row: 3/ 4;
}

#button-bar {
  grid-row: 4/ 5;
}

#contact-carousel {
  grid-row: 5/ 6;
}

#to-do {
  grid-row: 6 / 7;
}

#automation {
  grid-row: 7/ 8;
  padding-bottom: 20px;
}

#recent-messages {
  display: none;
}

@media screen and (min-width: 700px) {
  section {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 75px 75px 150px repeat(2, 1fr);
  }

  #contact-card {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }

  #location-scroller {
    grid-column: 1/ 5;
    grid-row: 4/ 5;
  }

  #button-bar {
    grid-column: 1/ 5;
    grid-row: 1/ 2;
  }

  #event-information {
    grid-column: 1/ 3;
    grid-row: 3/4;
  }

  #to-do {
    grid-column: 1/ 3;
    grid-row: 5/ 6;
  }
  #automation {
    grid-column: 3 / 5;
    grid-row: 5/ 6;
    padding: 0;
  }

  #contact-carousel {
    width: 100%;
    grid-column: 3 / 5;
    grid-row: 2 / 4;
  }
}
@media screen and (min-width: 800px) {
  section {
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: 75px 240px minmax(0, 1fr);
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
    grid-column: 1/ 5;
    grid-row: 3/ 4;
  }

  #to-do {
    grid-column: 5 / 8;
    grid-row: 3 / 4;

    height: 100%;
    max-height: 100%;
  }

  #recent-messages {
    grid-column: 8 / 11;
    grid-row: 3 / 4;
    display: flex;
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
