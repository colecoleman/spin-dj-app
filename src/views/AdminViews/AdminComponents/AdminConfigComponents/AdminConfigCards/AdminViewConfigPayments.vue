<template>
  <base-card v-if="loaded">
    <template v-slot:title>Payments</template>
    <template v-slot:content>
      <div class="payments-wrapper">
        <div class="payments-item">
          <h4>Deposit:</h4>
          <p>Deposit required to reserve services:</p>
          <input type="number" v-model="depositAmount" />
        </div>
        <div class="payments-item">
          <h4>Final Payment Due:</h4>
          <p>Increment:</p>
          <input type="number" v-model="finalPaymentIncrement" />
          <p>Increment Type: (prior to event date)</p>
          <select v-model="finalPaymentType">
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </select>
        </div>
        <div class="payments-item">
          <h4>Credit Card</h4>
          <p>Enable Credit Card Payments?</p>
          <select v-model="creditCardEnabled">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <p>Select preferred credit card processor (Stripe is default):</p>
          <select name="creditcard" id="">
            <option value="stripe">Stripe</option>
          </select>
          <div v-if="!paymentSettings.creditCard.Stripe.id">
            <button-standard-with-icon
              @click="createStripeAccountLink"
              text="Create Account With Stripe"
            ></button-standard-with-icon>
          </div>

          <div v-if="paymentSettings.creditCard.Stripe.id">
            <button-standard-with-icon
              @click="stripeHealthy ? '' : createStripeAccountLink"
              :text="
                stripeHealthy ? 'Status: Healthy' : 'Complete Stripe Setup'
              "
            ></button-standard-with-icon>
          </div>
        </div>
        <div class="payments-item">
          <h4>Check</h4>
          <p>Allow clients to pay by check?</p>
          <select name="check" id="" v-model="checkEnabled">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <p>Instructions for mailing a check:</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="checkInstructions"
          ></textarea>
        </div>
        <div class="payments-item">
          <h4>Give clients another way to pay:</h4>
          <p>Custom Payment Name:</p>
          <input type="text" v-model="customName" />
          <p>Custom Payment Description:</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="customInstructions"
          ></textarea>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import SVGs from "../../../../../assets/SVGs/svgIndex";

export default {
  data() {
    return {
      SVGs,
      loaded: false,
    };
  },
  computed: {
    paymentSettings: {
      get() {
        return this.$store.state.businessSettings.payments;
      },
    },
    stripeHealthy() {
      if (!this.$store.state.businessSettings.payments.creditCard.Stripe.id) {
        return undefined;
      } else {
        return this.checkStripeAccountStatus();
      }
    },
    depositAmount: {
      get() {
        if (this.paymentSettings.depositAmount) {
          return this.paymentSettings.depositAmount;
        } else {
          return 0;
        }
      },
      set(val) {
        return this.$store.commit("adminConfigPaymentsSetDepositAmount", val);
      },
    },

    finalPaymentIncrement: {
      get() {
        if (this.paymentSettings.finalPayment) {
          return this.paymentSettings.finalPayment.increment;
        } else {
          return 0;
        }
      },
      set(val) {
        return this.$store.commit(
          "adminConfigPaymentsSetFinalPaymentIncrement",
          val
        );
      },
    },

    finalPaymentType: {
      get() {
        if (this.paymentSettings.finalPayment) {
          return this.paymentSettings.finalPayment.type;
        } else {
          return "weeks";
        }
      },
      set(val) {
        return this.$store.commit(
          "adminConfigPaymentsSetFinalPaymentType",
          val
        );
      },
    },

    creditCardEnabled: {
      get() {
        if (this.paymentSettings.creditCard.enabled) {
          return this.paymentSettings.creditCard.enabled;
        } else {
          return false;
        }
      },
      set(val) {
        return this.$store.commit(
          "adminConfigPaymentsSetCreditCardEnabled",
          val
        );
      },
    },

    checkEnabled: {
      get() {
        if (this.paymentSettings.check.enabled) {
          return this.paymentSettings.check.enabled;
        } else {
          return false;
        }
      },
      set(val) {
        return this.$store.commit("adminConfigPaymentsSetCheckEnabled", val);
      },
    },

    checkInstructions: {
      get() {
        if (this.paymentSettings.check.instructions) {
          return this.paymentSettings.check.instructions;
        } else {
          return "";
        }
      },
      set(val) {
        return this.$store.commit(
          "adminConfigPaymentsSetCheckInstructions",
          val
        );
      },
    },
    customName: {
      get() {
        if (this.paymentSettings.custom.name) {
          return this.paymentSettings.custom.name;
        } else {
          return "";
        }
      },
      set(val) {
        return this.$store.commit("adminConfigPaymentsSetCustomName", val);
      },
    },
    customInstructions: {
      get() {
        if (this.paymentSettings.custom.instructions) {
          return this.paymentSettings.custom.instructions;
        } else {
          return "";
        }
      },
      set(val) {
        return this.$store.commit(
          "adminConfigPaymentsSetCustomInstructions",
          val
        );
      },
    },
  },
  methods: {
    async checkStripeAccountStatus() {
      this.$store.dispatch("stripeCheckAccount").then((res) => {
        if (res.charges_enabled) {
          return true;
        } else {
          return false;
        }
      });
    },
    async createStripeAccountLink() {
      let stripeId;
      if (this.paymentSettings.creditCard.Stripe.id) {
        stripeId = this.paymentSettings.creditCard.Stripe.id;
      }
      this.$store
        .dispatch("stripeCreateAccount", stripeId)
        .then(async (res) => {
          this.paymentSettings.creditCard.Stripe = {
            id: res.data.id.id,
          };
          this.$store.dispatch("updateBusinessSettings").then(() => {
            window.location.href = res.data.url;
          });
        });
    },
  },
  created() {
    if (!this.paymentSettings.finalPayment) {
      this.$store.state.businessSettings.payments.finalPayment = {
        increment: null,
        type: null,
      };
    }
    this.loaded = true;
  },
  props: ["DBpaymentInformation"],
};
</script>

<style scoped>
.payments-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 100%;
  overflow-y: scroll;
  margin-top: 10px;
}

.payments-section {
  width: 50%;
}

.payments-item {
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 15px;
  border-bottom: 1px solid var(--cardOutline);
}
.payments-item > p,
.payments-section > h5,
.payments-item > h5,
.payments-item > h4 {
  text-align: left;
}
.payments-item > input,
.payments-item > select,
.button-standard-with-icon {
  width: 50%;
  align-self: left;
  justify-self: left;
}

.button-standard-with-icon {
  margin-top: 10px;
}

.x-icon {
  height: 10px;
  width: 10px;
  margin: 0px 5px;
}
</style>
