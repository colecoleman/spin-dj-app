<template>
  <div id="payment-intent-wrapper">
    <div class="row-flex">
      <input
        type="text"
        v-model="chargeAmount"
        placeholder="Enter Payment Amount"
      />
      <button-standard-with-icon
        text="Confirm"
        @click="createPaymentIntent"
      ></button-standard-with-icon>
    </div>
  </div>
  <p :class="chargeAmountError ? 'error' : 'hidden'">
    Oops! Enter an amount in the field above.
  </p>
</template>
<script>
import helpers from "../../../../helpers.js";
// import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      stripeAPIToken:
        "pk_test_51KB2fZJb4IVAatoGYdJekSis2i0uQilzUHqTvfE3P6x7OJkDhdahSWKMzCocECTUslikYgWZTAvr1npNMGUNaWm800To81qBha",
      chargeAmount: null,
      chargeAmountError: false,
      clientSecret: null,
      payeeAccount: null,
    };
  },
  methods: {
    formatDate: helpers.formatDate,
    balanceOutstanding: helpers.balanceOutstanding,
    createPaymentIntent() {
      if (!this.chargeAmount) {
        this.chargeAmountError = true;
        return;
      } else {
        this.chargeAmountError = false;
        let payload = {
          eventId: this.eventId,
          tenantId: this.$store.state.user.tenantId,
          payerName:
            this.$store.state.user.given_name +
            " " +
            this.$store.state.user.family_name,
          chargeAmount: this.chargeAmount * 100,
          currencyType: this.payeeAccount.default_currency,
          payeeId: this.payeeAccount.id,
        };
        this.$store
          .dispatch("stripeCreatePaymentIntent", payload)
          .then((res) => {
            this.clientSecret = res.data.client_secret;
            this.$emit("submitPaymentIntent", res.data);
          });
      }
    },
  },
  computed: {
    outstandingBalance() {
      return (
        "$" +
        (
          this.balanceOutstanding(this.event.invoice, this.event.data) / 100
        ).toLocaleString()
      );
    },
  },
  async created() {
    await this.$store.dispatch("stripeCheckAccount").then((res) => {
      this.payeeAccount = res;
    });
    // this.stripe = await loadStripe(this.stripeAPIToken);
  },
  components: {},
  props: ["eventId", "event", "stripe"],
};
</script>
<style scoped>
#payment-intent-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: left;
}

.error {
  color: red;
}

p {
  margin-left: 10px;
}

.hidden {
  visibility: hidden;
}

.row-flex {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 20px;
}

input {
  margin-right: 10px;
}
</style>