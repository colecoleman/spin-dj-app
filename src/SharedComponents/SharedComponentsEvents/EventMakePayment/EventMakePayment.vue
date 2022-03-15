<template>
  <div class="make-payment-wrapper" v-if="method === 'manual'">
    <div class="row-flex">
      <div class="column-flex">
        <p>Reference:</p>
        <input
          type="text"
          :class="paymentNameError ? 'error' : ''"
          v-model="manualPayment.name"
        />
      </div>
      <div class="column-flex">
        <p>Amount:</p>
        <input
          type="number"
          :class="paymentAmountError ? 'error' : ''"
          v-model="manualPayment.amount"
        />
      </div>
    </div>
    <div class="row-flex">
      <button-standard-with-icon
        @click="changeToCardPayment"
        text="Change To Card"
      />
      <button-standard-with-icon
        @click="submitManualPayment"
        text="Submit Payment"
      />
    </div>
  </div>
  <div class="make-payment-wrapper" v-if="method === 'stripe'">
    <div class="make-payment-step" v-if="step === 1">
      <stripe-create-payment-intent
        :event="event"
        :eventId="eventId"
        :stripe="stripe"
        @submit-payment-intent="submitPaymentIntent"
      />
    </div>
    <div class="make-payment-step" v-if="step === 2">
      <stripe-enter-card-details
        :stripePk="stripeAPIToken"
        :paymentIntent="paymentIntent"
        :stripe="stripe"
      />
    </div>
    <button-standard-with-icon
      v-if="userRole == 'admin'"
      @click="changeToManualPayment"
      text="Record Manual Payment"
    />
  </div>
</template>
<script>
import StripeCreatePaymentIntent from "./Stripe/StripeCreatePaymentIntent.vue";
import StripeEnterCardDetails from "./Stripe/StripeEnterCardDetails.vue";
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      method: "stripe",
      stripe: null,
      paymentIntent: null,
      payeeAccount: null,
      stripeAPIToken:
        "pk_live_51KB2fZJb4IVAatoGPTcDxwy6Ktx8pcAYFBeYRE6JEUq4fKiyxXpiWPWuCeA5XNzmqNFUi9DwWiowngI594BjiXrY00BeFT0rTK",
      step: 1,
      manualPayment: {
        name: undefined,
        amount: undefined,
      },
      paymentNameError: false,
      paymentAmountError: false,
    };
  },

  methods: {
    submitPaymentIntent(intent) {
      this.paymentIntent = intent;
      this.step++;
    },
    submitManualPayment() {
      if (!this.manualPayment.name) {
        this.paymentNameError = true;
      } else {
        this.paymentNameError = false;
      }
      if (!this.manualPayment.amount) {
        this.paymentAmountError = true;
      } else {
        this.paymentAmountError = false;
      }
      if (!this.paymentNameError && !this.paymentAmountError) {
        let item = {
          name: this.manualPayment.name,
          amount: this.manualPayment.amount * 100,
        };
        this.$emit("applyManualPayment", item);
      }
    },
    changeToCardPayment() {
      this.method = "stripe";
    },
    changeToManualPayment() {
      this.method = "manual";
    },
  },
  computed: {
    userRole() {
      if (this.$store.state.user.userId === this.$store.state.user.tenantId) {
        return "admin";
      } else {
        return this.$store.state.user.role;
      }
    },
  },
  async created() {
    this.payeeAccount =
      this.$store.state.businessSettings.payments.creditCard.Stripe;
    this.stripe = await loadStripe(this.stripeAPIToken, {
      stripeAccount: this.payeeAccount.id,
    });
  },
  components: {
    StripeCreatePaymentIntent,
    StripeEnterCardDetails,
  },
  emits: ["applyManualPayment"],
  props: ["eventId", "event"],
};
</script>
<style scoped>
.button-standard-with-icon {
  margin: 30px;
  width: 50%;
}
.make-payment-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: left;
  height: 100%;
  /* margin: 20px; */
}

.make-payment-step {
  max-width: 100%;
}

.error {
  border: 1px solid red;
}

.row-flex {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
