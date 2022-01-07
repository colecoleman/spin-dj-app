<template>
  <div id="stripe-card-details-wrapper">
    <form id="payment-form">
      <div id="card-element"></div>
      <div id="card-errors" role="alert"></div>
      <!-- <button id="submit">Pay</button> -->
      <button-standard-with-icon
        text="Pay"
        @click="submitCardPayment"
      ></button-standard-with-icon>
    </form>
  </div>
</template>
<script>
import ButtonStandardWithIcon from "../../../SharedComponentsUI/ButtonStandardWithIcon.vue";
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      stripe: null,
      elements: null,
      style: null,
      card: null,
    };
  },
  methods: {
    submitCardPayment() {
      this.stripe
        .confirmCardPayment(this.paymentIntent.client_secret, {
          payment_method: {
            card: this.card,
          },
        })
        .then((res) => {
          if (res.paymentIntent.status === "succeeded") {
            this.$store.commit("addStatus", {
              type: "success",
              note: "Payment Successful",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  computed: {
    branding() {
      if (this.$store.state.businessSettings.identity.branding) {
        return this.$store.state.businessSettings.identity.branding;
      } else {
        return {
          backgroundColor: "#F0F0F0",
          foregroundColor: "#FFFFFF",
          cardOutline: "#DDDDDD",
          highlightColor: "#00F5FF",
          textColor: "#000000",
        };
      }
    },
  },
  async created() {
    this.payeeAccount = await this.$store.dispatch("stripeCheckAccount");
    this.stripe = await loadStripe(this.stripePk, {
      stripeAccount: this.payeeAccount.id,
    });
    this.elements = this.stripe.elements();
    this.style = {
      base: {
        iconColor: this.branding.textColor,
        color: this.branding.textColor,
        // backgroundColor: this.branding.backgroundColor,
        fontWeight: "500",
        outline: "1px solid black",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: this.branding.textColor,
        },
        "::placeholder": {
          color: this.branding.textColor,
        },
      },
    };

    this.card = this.elements.create("card", { style: this.style });
    this.card.mount("#card-element");
  },

  components: { ButtonStandardWithIcon },
  props: ["paymentIntent", "stripePk"],
};
</script>
<style scoped>
#stripe-card-details-wrapper {
  width: 400px;
}

#card-element {
  /* background-color: var(--backgroundColor); */
  border-radius: 8px;
  border: 1px solid var(--textColor);
  padding: 10px;
  margin-bottom: 10px;
}
</style>