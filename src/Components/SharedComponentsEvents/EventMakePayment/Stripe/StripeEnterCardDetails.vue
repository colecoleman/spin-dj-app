<template>
  <div id="stripe-card-details-wrapper">
    <h4>Pay {{ formatPrice(paymentIntent.amount) }}</h4>
    <form id="payment-form">
      <div id="card-element"></div>
      <div id="card-errors" role="alert"></div>
      <div class="button-container">
        <round-icon-button
          class="back-arrow"
          :svg="submitting ? 'loading' : 'back-arrow'"
          @click="navigateBackward"
        />
        <round-icon-button
          class="back-arrow"
          :svg="submitting ? 'loading' : 'circle-checkmark'"
          @click="submitCardPayment"
        />
      </div>
    </form>
  </div>
</template>
<script>
import { formatPrice } from "../../../../helpers.js";
import { loadStripe } from "@stripe/stripe-js";
import RoundIconButton from "../../../SharedComponentsUI/RoundIconButton.vue";

export default {
  data() {
    return {
      stripe: null,
      elements: null,
      style: null,
      card: null,
      submitting: false,
    };
  },
  methods: {
    formatPrice,
    submitCardPayment() {
      this.submitting = true;
      let elements = this.elements;
      this.stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: "https://spindj.io/",
          },
          redirect: "if_required",
        })
        .then((res) => {
          if (res.paymentIntent.status === "succeeded") {
            this.$store.commit("addStatus", {
              type: "success",
              note: "Payment Successful",
            });
          }
          this.$emit("successful-payment", res.paymentIntent);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    navigateBackward() {
      this.$emit("navigate-backwards", "chooseDigitalPaymentAmount");
    },
  },
  computed: {
    branding() {
      return this.$store.getters.branding;
    },
  },
  async created() {
    this.payeeAccount = await this.$store.dispatch("stripeCheckAccount");
    this.stripe = await loadStripe(this.stripePk, {
      stripeAccount: this.payeeAccount.id,
    });
    this.elements = this.stripe.elements({
      clientSecret: this.paymentIntent.client_secret,
    });

    this.card = this.elements.create("payment");
    this.card.mount("#card-element");
  },

  components: { RoundIconButton },
  emits: ["closeCard", "successful-payment", "navigate-backwards"],
  props: ["paymentIntent", "stripePk"],
};
</script>
<style scoped>
#stripe-card-details-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#card-element {
  border-radius: 8px;
  width: 100%;
}
.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.back-arrow {
  height: 30px;
  width: 30px;
  margin: 20px;
}
</style>
