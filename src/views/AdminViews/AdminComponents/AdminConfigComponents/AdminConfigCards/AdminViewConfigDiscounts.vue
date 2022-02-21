<template>
  <base-card>
    <template v-slot:title>Discounts</template>
    <template v-slot:content>
      <div class="discounts-wrapper">
        <div class="discounts-section">
          <h5 class="bold">Add New Discounts:</h5>
          <div class="discounts-item">
            <p>Discount Name:</p>
            <input type="text" v-model.trim="discount.name" />
          </div>
          <div class="discounts-item">
            <p>Discount Type:</p>
            <select name="price-option" id="" v-model="discount.type">
              <option disabled value="">Select a price option</option>
              <option value="percentage">Percentage</option>
              <option value="dollar">Dollar</option>
            </select>
          </div>
          <div class="discounts-item" v-if="discount.type === 'percentage'">
            <div class="discounts-item">
              <p>Discount Percentage <i>(example: '10' = 10%)</i></p>
              <input type="number" v-model.number="discount.amount" />
            </div>

            <button-standard-with-icon
              text="Add Discount"
              @click="addDiscount()"
              class="form-button"
            />
          </div>
          <div class="discounts-item" v-if="discount.type == 'dollar'">
            <div class="discounts-item">
              <p>Dollar Discount:</p>
              <input type="number" v-model.number="discount.amount" />
            </div>

            <button-standard-with-icon
              text="Add Discount"
              @click="addDiscount()"
              class="form-button"
            />
          </div>
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

                <img
                  :src="SVGs.XIconSVG"
                  class="x-icon"
                  @click="deleteDiscount(index)"
                />
                <img
                  :src="SVGs.EditPenSVG"
                  class="x-icon"
                  @click="editDiscount(discount, index)"
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
import SVGs from "../../../../../assets/SVGs/svgIndex.js";
import { formatPrice } from "../../../../../helpers.js";
export default {
  data() {
    return {
      SVGs,
      editIndex: undefined,
      discount: {
        name: undefined,
        type: undefined,
        amount: undefined,
      },
    };
  },
  methods: {
    formatPrice,
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
      if ("product" in this.$store.state.businessSettings) {
        if ("discounts" in this.$store.state.businessSettings.product) {
          if (this.discounts.length > 0) {
            return true;
          }
        }
      }
      return false;
    },
    discounts() {
      return this.$store.state.businessSettings.product.discounts;
    },
  },
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
    margin-top: 10px;
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

  img {
    height: 10px;
    width: 10px;
    margin: 0px 5px;
    cursor: pointer;
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