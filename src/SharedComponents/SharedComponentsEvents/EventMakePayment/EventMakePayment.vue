<template>
  <div class="make-payment-wrapper">
    <div class="make-payment-step" v-if="step === 1">
      <stripe-create-payment-intent
        :event="event"
        :eventId="eventId"
        :stripe="stripe"
        @submit-payment-intent="submitPaymentIntent"
      ></stripe-create-payment-intent>
    </div>
    <div class="make-payment-step" v-if="step === 2">
      <stripe-enter-card-details
        :stripePk="stripeAPIToken"
        :paymentIntent="paymentIntent"
        :stripe="stripe"
      ></stripe-enter-card-details>
    </div>
  </div>
</template>
<script>
import StripeCreatePaymentIntent from "./Stripe/StripeCreatePaymentIntent.vue";
import StripeEnterCardDetails from "./Stripe/StripeEnterCardDetails.vue";
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      stripe: null,
      paymentIntent: null,
      payeeAccount: null,
      stripeAPIToken:
        "pk_test_51KB2fZJb4IVAatoGYdJekSis2i0uQilzUHqTvfE3P6x7OJkDhdahSWKMzCocECTUslikYgWZTAvr1npNMGUNaWm800To81qBha",
      step: 1,
    };
  },

  methods: {
    submitPaymentIntent(intent) {
      this.paymentIntent = intent;
      this.step++;
    },
  },
  async created() {
    this.stripe = await loadStripe(this.stripeAPIToken, {
      stripeAccount: this.payeeAccount.id,
    });
  },
  components: {
    StripeCreatePaymentIntent,
    StripeEnterCardDetails,
  },
  props: ["eventId", "event"],
};
</script>
<style scoped>
.make-payment-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: left;
  margin: 20px;
}

.make-payment-step {
  width: 100%;
}
</style>