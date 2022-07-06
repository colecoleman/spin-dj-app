<template>
  <layout
    :addButtonText="addButtonText"
    :figureDetails="buildDetails"
    :processing="processing"
    productNameProperty="name"
    :products="discounts"
    :saveButtonEnabled="adjustmentReadyToBeSubmitted"
    @clear-form="clearForm"
    @close="close"
    @delete-button-clicked="deleteAdjustment"
    @edit-button-clicked="editAdjustment"
    @save-button-clicked="addAdjustment"
  >
    <template v-slot:form>
      <div class="adjustments-section">
        <input-with-title
          class="input"
          type="text"
          title="Adjustment Name:"
          :inputValue="adjustment.name"
          @input="fieldInput(adjustment, 'name', $event)"
        />
        <input-with-title
          class="input"
          title="Discount / Charge:"
          type="select"
          :options="discountOrCharge"
          :inputValue="adjustment.direction"
          @input="fieldInput(adjustment, 'direction', $event)"
        />
        <input-with-title
          class="input"
          title="Percentage / Amount:"
          type="select"
          :options="percentageOrAmount"
          :inputValue="adjustment.type"
          @input="fieldInput(adjustment, 'type', $event)"
        />
        <input-with-title
          class="input"
          v-if="adjustment.type === 'percentage'"
          type="number"
          title="Discount Percentage (example : '10' = 10%)"
          :inputValue="adjustment.amount"
          @input="fieldInput(adjustment, 'amount', $event)"
        />
        <input-with-title
          class="input"
          v-if="adjustment.type === 'dollar'"
          type="number"
          title="Dollar Discount:"
          :inputValue="adjustment.amount"
          @input="fieldInput(adjustment, 'amount', $event)"
        />
      </div>
    </template>
  </layout>
</template>

<script>
import { formatPrice } from "../../../../helpers.js";
import InputWithTitle from "../../../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import Layout from "../AdminConfigUIComponents/AdminConfigLayoutTileAndForm.vue";

export default {
  data() {
    return {
      activeView: "adjustments-list",
      addButtonText: "Add New Discount",
      processing: false,
      editIndex: undefined,
      discountOrCharge: ["discount", "charge"],
      percentageOrAmount: ["percentage", "dollar"],
      adjustment: {
        id: "adj" + Date.now(),
        direction: undefined,
        name: undefined,
        type: undefined,
        amount: undefined,
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },

    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    buildDetails(adjustment) {
      if (adjustment.type === "dollar") {
        return [formatPrice(-adjustment.amount)];
      } else if (adjustment.type === "percentage") {
        return [`${adjustment.amount * 100}%`];
      }
    },
    clearForm() {
      this.adjustment = {
        name: undefined,
        direction: undefined,
        type: undefined,
        amount: undefined,
      };
      this.editIndex = undefined;
    },
    async addAdjustment() {
      this.processing = true;
      if (this.adjustment.type === "dollar") {
        this.adjustment.amount *= 100;
      }
      if (this.adjustment.type === "percentage") {
        this.adjustment.amount *= 0.01;
      }
      if (this.adjustment.direction === "charge") {
        this.adjustment.amount *= -1;
      }
      if (this.editIndex != undefined) {
        await this.$store.dispatch("editAdjustment", this.adjustment);
      } else {
        await this.$store.dispatch("addAdjustment", this.adjustment);
      }
      this.processing = false;
    },
    async deleteAdjustment(adj) {
      // creating id to match on back end for backwards compatibility,
      // in case adj doesn't have id (for legacy users)
      let id = adj.id ? adj.id : adj.name + adj.amount;
      await this.$store.dispatch("deleteAdjustment", id);
    },
    editAdjustment(adjustment, index) {
      this.adjustment = { ...this.adjustment, ...adjustment };
      this.editIndex = index;
      if (this.adjustment.type === "dollar") {
        this.adjustment.amount = this.adjustment.amount / 100;
      }
      if (this.adjustment.type === "percentage") {
        this.adjustment.amount = this.adjustment.amount / 0.01;
      }
    },
  },
  computed: {
    adjustmentReadyToBeSubmitted() {
      return (
        this.adjustment.name &&
        this.adjustment.direction &&
        this.adjustment.type &&
        this.adjustment.amount
      );
    },
    discounts() {
      return this.$store.getters.discounts;
    },
  },
  emits: ["close"],
  components: {
    InputWithTitle,
    Layout,
  },
};
</script>

<style scoped>
@media screen {
  .adjustments-section {
    width: calc(100% - 10px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 5px;
    overflow: scroll;
  }

  .adjustments-form-section {
    width: 100%;
    height: fit-content;
  }

  .input {
    width: 100%;
  }
}
</style>
