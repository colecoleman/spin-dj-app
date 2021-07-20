<template>
  <backdrop
    v-if="invoiceOpen || formsOpen || contractOpen"
    @click="closePopup()"
  ></backdrop>
  <invoice-popup
    :invoice="event.eventInvoice"
    :event="event"
    :client="client"
    v-if="invoiceOpen"
    @close-popup="closePopup()"
  ></invoice-popup>
  <forms-popup v-if="formsOpen" @close-popup="closePopup()"></forms-popup>
  <contract-popup
    v-if="contractOpen"
    @close-popup="closePopup()"
  ></contract-popup>
  <base-card-no-heading>
    <div class="button-parent">
      <div class="button-div">
        <button-standard-with-icon
          text="View Forms"
          @click="openForms()"
        ></button-standard-with-icon>
      </div>
      <div class="button-div">
        <button-standard-with-icon
          text="View Invoice"
          @click="openInvoice()"
        ></button-standard-with-icon>
      </div>
      <div class="button-div">
        <button-standard-with-icon
          text="View Contract"
          @click="openContract()"
        ></button-standard-with-icon>
      </div>
      <div class="button-div">
        <button-with-drop-down-selections
          text="Actions"
          :actions="actionsItems"
          :clicked="actionsClicked"
          class="dropdown-button"
        >
        </button-with-drop-down-selections>
      </div>
    </div>
  </base-card-no-heading>
</template>

<script>
import BaseCardNoHeading from "../../../SharedComponents/SharedComponentsUI/BaseCardNoHeading.vue";
import ButtonStandardWithIcon from "../../../SharedComponents/SharedComponentsUI/ButtonStandardWithIcon.vue";
import ButtonWithDropDownSelections from "../../../SharedComponents/SharedComponentsUI/ButtonWithDropDownSelections.vue";
import Backdrop from "../../../SharedComponents/SharedComponentsUI/Backdrop.vue";
import FormsPopup from "./FormsPopup.vue";
import InvoicePopup from "./InvoicePopup.vue";
import ContractPopup from "./ContractPopup.vue";

import editPen from "../../../assets/SVGs/edit-pen.svg";
import passingTime from "../../../assets/SVGs/passing-time.svg";
import trashCan from "../../../assets/SVGs/trash-can.svg";

export default {
  data() {
    return {
      passingTime,
      editPen,
      trashCan,

      backdropOpen: false,
      contractOpen: false,
      invoiceOpen: false,
      formsOpen: false,
      actionsItems: [
        {
          title: "postpone",
          action: this.postponeEvent,
          danger: false,
          icon: passingTime,
        },
        {
          title: "edit",
          action: this.editEvent,
          danger: false,
          icon: editPen,
        },
        {
          title: "delete",
          action: this.deleteEvent,
          danger: true,
          icon: trashCan,
        },
      ],
    };
  },
  methods: {
    openForms() {
      this.formsOpen = true;
      this.backdropOpen = true;
    },
    openInvoice() {
      console.log("ll");
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
    deleteEvent() {
      alert("deleted!");
    },
    editEvent() {
      alert("edited!");
    },
    postponeEvent() {
      alert("postponed");
    },
  },
  components: {
    BaseCardNoHeading,
    ButtonStandardWithIcon,
    ButtonWithDropDownSelections,
    Backdrop,
    InvoicePopup,
    FormsPopup,
    ContractPopup,
  },
  props: ["event", "client"],
};
</script>

<style scoped>
.button-parent {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.button-div {
  width: 25%;
  height: 100%;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.dropdown-button {
  display: flex;
  flex-direction: column;

  width: 90%;
  margin-top: 8.5px;
  margin-left: 5px;
  text-transform: uppercase;
  padding: 5px 5px 5px 5px;

  border-radius: 7px;
  fill: white;
  position: relative;
}

.dropdown-button > {
  height: calc(100% - 17px);
  /* align-self: center; */
}
</style>