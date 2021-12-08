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
          <h5
            v-if="!this.$store.state.businessSettings.product.discounts.length"
          >
            No discounts have been added yet! Add some!
          </h5>
          <div
            class="discounts-item"
            style="border-bottom: 1px solid gray; margin-bottom: 10px"
            v-for="discount in this.$store.state.businessSettings.product
              .discounts"
            :key="discount.id"
          >
            <h4>
              {{ discount.name }}

              <img
                :src="XIconSVG"
                class="x-icon"
                @click="deletePackage(index)"
              />
            </h4>

            <div class="discounts-display-section">
              <div class="discounts-item" v-if="discount.type === 'percentage'">
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
    </template>
  </base-card>
</template>

<script>
import XIconSVG from "../../../../assets/SVGs/x-icon.svg";

import helpers from "../../../../helpers.js";
export default {
  data() {
    return {
      XIconSVG,
      discount: {
        name: undefined,
        type: undefined,
        amount: undefined,
      },
    };
  },
  methods: {
    formatPrice: helpers.formatPrice,
    addDiscount() {
      if (this.discount.type === "dollar") {
        this.discount.amount *= 100;
      }
      if (this.discount.type === "percentage") {
        this.discount.amount *= 0.01;
      }
      this.$store.commit("adminConfigAddDiscount", this.discount);
      this.discount = {
        name: undefined,
        type: undefined,
        amount: undefined,
      };
    },
  },
  computed: {},

};
</script>

<style scoped>
section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.config-section {
  height: auto;
}

#configuration-navigation {
  width: 20%;
  height: 100%;
}
#body {
  width: 80%;
  height: 100%;
  overflow: scroll;
}

#branding-preferences-wrapper {
  display: flex;
  flex-direction: row;
}

.branding-preferences-item {
  display: flex;
  flex-direction: column;
  width: 20%;
}

.business-information-wrapper,
.service-wrapper,
.package-wrapper,
.add-on-wrapper,
.discounts-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
}

.business-information-section,
.service-section,
.package-section,
.add-on-section,
.discounts-section {
  width: 50%;
}

.business-information-item,
.service-item,
.package-item,
.add-on-item,
.discounts-item {
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 10px;
}

.business-information-item > p,
.service-item > p,
.service-section > h5,
.package-item > p,
.package-section > h5,
.add-on-item > p,
.add-on-section > h5,
.discounts-item > p,
.discounts-section > h5 {
  text-align: left;
}

.business-information-item > input,
.service-item > input,
.service-item > select,
.package-item > input,
.package-item > select,
.package-item > label,
.add-on-item > select,
.add-on-item > label,
.add-on-item > input,
.discounts-item > select,
.discounts-item > label,
.discounts-item > input,
.form-button {
  width: 50%;
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

.bold {
  font-weight: 600;
  margin-top: 20px;
}

:disabled {
  opacity: 0.5;
}

.floating-button {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background-color: var();
}

.x-icon {
  height: 10px;
  width: 10px;
}
</style>