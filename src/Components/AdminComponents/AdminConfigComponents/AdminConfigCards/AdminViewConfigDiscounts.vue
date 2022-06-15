<template>
  <base-card title="Discounts">
    <template v-slot:content>
      <div class="discounts-wrapper">
        <div class="discounts-section">
          <h5 class="bold">Add New Discount:</h5>
          <input-with-title
            type="text"
            title="Discount Name:"
            :inputValue="discount.name"
            @input="fieldInput(discount, 'name', $event)"
          />
          <input-with-title
            title="Discount Type:"
            type="select"
            :options="discountTypes"
            :inputValue="discount.type"
            @input="fieldInput(discount, 'type', $event)"
          />
          <input-with-title
            v-if="discount.type === 'percentage'"
            type="number"
            title="Discount Percentage (example : '10' = 10%)"
            :inputValue="discount.amount"
            @input="fieldInput(discount, 'amount', $event)"
          />
          <input-with-title
            v-if="discount.type === 'dollar'"
            type="number"
            title="Dollar Discount:"
            :inputValue="discount.amount"
            @input="fieldInput(discount, 'amount', $event)"
          />
          <button-standard-with-icon
            v-if="discount.type"
            text="Add Discount"
            @click="addDiscount()"
            class="form-button"
          />
        </div>
        <div class="discounts-section">
          <h5 v-if="!hasDiscounts">
            No discounts have been added yet! Add some!
          </h5>
          <div v-if="hasDiscounts" class="conditional-discounts-wrapper">
            <div
              class="discounts-item"
              style="border-bottom: 1px solid gray; margin-bottom: 10px"
              v-for="(discount, index) in discounts"
              :key="discount.id"
            >
              <h4>
                {{ discount.name }}

                <vue-svg
                  svg="x-icon"
                  :customStyle="svgStyling"
                  @clicked="deleteDiscount(index)"
                />
                <vue-svg
                  svg="edit-pen"
                  :customStyle="svgStyling"
                  @clicked="editDiscount(discount, index)"
                />
              </h4>

              <div class="discounts-display-section">
                <div
                  class="discounts-item"
                  v-if="discount.type === 'percentage'"
                >
                  <p>
                    <b>Discount Amount:</b>
                    {{ discount.amount * 100 }}%
                  </p>
                </div>
                <div class="discounts-item" v-if="discount.type === 'dollar'">
                  <p>
                    <b>Discount Amount: </b>{{ formatPrice(discount.amount) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import VueSvg from "../../../../assets/VueSvg.vue";
import InputWithTitle from "../../../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
import { formatPrice } from "../../../../helpers.js";
export default {
  data() {
    return {
      svgStyling:
        "height: 10px; width: 10px; margin: 0px 5px; cursor: pointer;",
      editIndex: undefined,
      discountTypes: ["percentage", "dollar"],
      discount: {
        name: undefined,
        type: undefined,
        amount: undefined,
      },
    };
  },
  methods: {
    formatPrice,
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
    addDiscount() {
      if (this.discount.type === "dollar") {
        this.discount.amount *= 100;
      }
      if (this.discount.type === "percentage") {
        this.discount.amount *= 0.01;
      }
      if (this.editIndex != undefined) {
        let payload = {
          index: this.editIndex,
          discount: this.discount,
        };
        this.$store.commit("adminConfigEditDiscount", payload);
      } else {
        this.$store.commit("adminConfigAddDiscount", this.discount);
      }
      this.discount = {
        name: undefined,
        type: undefined,
        amount: undefined,
      };
    },
    deleteDiscount(index) {
      this.$store.commit("adminConfigDeleteDiscount", index);
    },
    editDiscount(discount, index) {
      this.discount = { ...this.discount, ...discount };
      this.editIndex = index;
      if (this.discount.type === "dollar") {
        this.discount.amount = this.discount.amount / 100;
      }
      if (discount.type === "percentage") {
        this.discount.amount = this.discount.amount / 0.01;
      }
    },
  },
  computed: {
    hasDiscounts() {
      if (this.discounts.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    discounts() {
      return this.$store.getters.discounts;
    },
  },
  components: { InputWithTitle, VueSvg },
};
</script>

<style scoped>
@media screen {
  p {
    font-size: 9pt;
  }

  .discounts-wrapper {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    max-height: 100%;
    overflow-y: scroll;
    padding: 10px;
  }

  .discounts-section {
    width: 100%;
  }

  .discounts-item {
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-left: 10px;
  }

  .conditional-discounts-wrapper {
    height: fit-content;
    max-height: 300px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
  }
  .discounts-item > p,
  .discounts-section > h5 {
    text-align: left;
  }

  .discounts-item > select,
  .discounts-item > label,
  .discounts-item > input,
  .form-button {
    width: 90%;
    align-self: left;
    justify-self: left;
  }

  .inline-input-with-button {
    display: flex;
    flex-direction: row;
    height: 30px;
  }

  .inline-input-with-button > input {
    margin-right: 5px;
  }

  :disabled {
    opacity: 0.5;
  }
  @media (min-width: 850px) {
    .discounts-wrapper {
      flex-direction: row;
    }

    .discounts-section {
      width: 50%;
    }

    .discounts-item > select,
    .discounts-item > label,
    .discounts-item > input,
    .form-button {
      width: 50%;
    }
    .conditional-discounts-wrapper {
      height: fit-content;
      max-height: 100%;
      overflow: scroll;
    }
  }
}
</style>