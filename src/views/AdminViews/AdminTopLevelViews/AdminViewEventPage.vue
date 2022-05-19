<template>
  <div v-if="event" id="div-wrapper">
    <Transition name="rise">
      <invoice
        :invoice="event.invoice"
        :event="event"
        :client="client"
        v-if="popupOpen === 'invoice'"
        @close-popup="togglePopup"
      />
    </Transition>
    <Transition name="rise">
      <forms
        v-if="popupOpen === 'forms'"
        @close="togglePopup"
        @add-form-to-event="addFormToEvent"
        @delete-form="deleteForm"
        :forms="event.forms"
        :event="event"
        :eventId="event.userId"
        :eventTitle="event.title"
      />
    </Transition>
    <Transition name="rise">
      <contracts
        v-if="popupOpen === 'contract'"
        @close="togglePopup"
        :contacts="event.contacts"
        :event="event"
        :locations="event.locations"
      />
    </Transition>
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
          <vue-svg svg="x-icon" class="svg" @click="removeAdjustment(index)" />
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
            @click="addAdjustment(adjustment)"
            class="svg"
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
          @close-popup="togglePopup"
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
    <two-button-dialog-modal
      v-if="popupOpen === 'delete-event'"
      @select-button-one="confirmDeleteEvent()"
      @select-button-two="togglePopup"
      @close-modal="togglePopup"
    />
    <section>
      <div id="contact-card">
        <event-page-contact-card v-if="event" :event="event" />
      </div>
      <div id="location-scroller">
        <location-gallery :event="event" />
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
        <event-automation-list
          :automations="automations"
          :contacts="event.contacts"
          :event="event"
        />
      </div>
      <div id="contact-carousel">
        <contact-list :contacts="event.contacts" :event="event" />
      </div>
      <div id="to-do">
        <to-do-list
          :event="event"
          :eventContacts="event.contacts"
          listType="event"
        />
      </div>
      <div id="recent-messages">
        <recent-messages />
        <!-- :conversationList="eventConversations" -->
      </div>
    </section>
  </div>
</template>

<script>
import ToDoList from "../../../SharedComponents/SharedComponentsToDoList/ToDoList.vue";
import RecentMessages from "../../../SharedComponents/SharedComponentsMessaging/RecentMessages.vue";
import EventPageContactCard from "../../../SharedComponents/SharedComponentsEvents/EventPageContactCard.vue";
import ContactList from "../../../SharedComponents/SharedComponentsEvents/EventPageContactList/EventPageContactList.vue";
import LocationGallery from "../../../SharedComponents/SharedComponentsEvents/EventPageLocationGallery/LocationGallery.vue";
import EventAutomationList from "../AdminComponents/AdminSharedComponents/EventAutomationList.vue";
import Forms from "../../../SharedComponents/SharedComponentsEvents/Forms.vue";
import Invoice from "../../../SharedComponents/SharedComponentsEvents/Invoice.vue";
import EventInformation from "../AdminComponents/AdminEventPageComponents/EventInformation.vue";
import EventMakePayment from "../../../SharedComponents/SharedComponentsEvents/EventMakePayment/EventMakePayment.vue";
import PopupModal from "../../../SharedComponents/SharedComponentsUI/PopupModal.vue";
import Contracts from "../../../SharedComponents/SharedComponentsEvents/Contracts.vue";
import FourButtonBarWithDropDown from "../../../SharedComponents/SharedComponentsUI/FourButtonBarWithDropDown.vue";
import TwoButtonDialogModal from "../../../SharedComponents/SharedComponentsUI/TwoButtonDialogModal.vue";
import EventEditProducts from "../AdminComponents/AdminEventPageComponents/EventEditProducts.vue";
import _ from "lodash";

import VueSvg from "../../../assets/VueSvg.vue";

export default {
  data() {
    return {
      svgStyling: "height: 14px; margin: 10px;",
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
            parameter: "delete-event",
            danger: true,
            icon: "trash-can",
          },
          {
            title: "Payments",
            parameter: "payment",
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
            danger: false,
          },
        ],
      },
      popupOpen: undefined,
    };
  },
  computed: {
    client() {
      let contacts = this.event.contacts.filter((x) => x.role == "client");
      return contacts[0];
    },
    currentUser() {
      return this.$store.state.user;
    },
    event() {
      return this.$store.state.event;
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
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
      };
      this.$store.dispatch("editEvent", payload);
      this.togglePopup();
    },
    async confirmDeleteEvent() {
      let contacts = [...this.event.contacts];
      contacts.forEach((contact) => {
        if (contact) {
          let contactKey = {
            key: { userId: contact.userId, tenantId: contact.tenantId },
          };
          let eventKey = {
            key: { userId: this.event.userId, tenantId: this.event.tenantId },
          };
          let contactParameters = {
            contactKey: contactKey.key,
            variable: "associatedEvents",
            value: eventKey,
          };
          this.$store.dispatch("removeEventFromContact", contactParameters);
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
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
      };
      this.$store.dispatch("editEvent", payload);
    },
    deleteForm(form) {
      this.event.forms.splice(form, 1);
      let payload = {
        variable: "forms",
        value: this.event.forms,
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
      };
      this.$store.dispatch("editEvent", payload);
    },
    addProductToEvent(product) {
      this.event.invoice.products.push(_.cloneDeep(product));
      let payload = {
        variable: "invoice",
        value: this.event.invoice,
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
      };
      this.$store.dispatch("editEvent", payload);
    },
    removeProductFromEvent(product) {
      this.event.invoice.products.splice(product, 1);
      let payload = {
        variable: "invoice",
        value: this.event.invoice,
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
      };
      this.$store.dispatch("editEvent", payload);
    },
    invoiceSaveProducts() {
      let payload = {
        variable: "invoice",
        value: this.event.invoice,
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
      };
      this.$store.dispatch("editEvent", payload);
    },
    applyManualPayment(payment) {
      this.event.invoice.payments.push(payment);
      let payload = {
        variable: "invoice",
        value: this.event.invoice,
        eventKey: { userId: this.event.userId, tenantId: this.event.tenantId },
      };
      this.$store.dispatch("editEvent", payload);
      this.togglePopup();
    },
  },

  async created() {
    let key = {
      tenantId: this.$store.state.user.tenantId,
      userId: this.$route.params.id,
    };
    let event = await this.$store.dispatch("adminGetEvent", key);
    await this.$store.commit("setEvent", event);
    await this.$store.dispatch("getEventContacts", this.event);
    await this.$store.dispatch("getEventLocations", this.event);
  },
  components: {
    ToDoList,
    RecentMessages,
    EventPageContactCard,
    ContactList,
    LocationGallery,
    EventAutomationList,
    EventMakePayment,
    Invoice,
    PopupModal,
    EventInformation,
    Forms,
    Contracts,
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
.svg {
  height: 14px;
  margin: 10px;
}
section {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 75px 150px 250px 150px repeat(3, 250px);
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
  z-index: 10;
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
    grid-template-rows: 75px 75px 150px repeat(2, 250px);
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
    grid-template-columns: repeat(10, minmax(0, 1fr));
    grid-template-rows: 75px 240px minmax(300px, 1fr);
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
