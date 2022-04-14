<template>
  <div id="payment-intent-wrapper">
    <!-- <div class="row-flex"> -->
    <input-with-title
      type="number"
      title="Enter Payment Amount"
      placeholder="100"
      :inputValue="chargeAmount"
      @input="fieldInput(undefined, 'chargeAmount', $event)"
    />
    <button-standard-with-icon text="Confirm" @click="createPaymentIntent" />
    <!-- </div> -->
  </div>
  <p :class="chargeAmountError ? 'error' : 'hidden'">
    Oops! Enter an amount in the field above.
  </p>
</template>
<script>
import { balanceOutstanding } from "../../../../helpers.js";
import InputWithTitle from "../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";
// import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      stripeAPIToken:
        "pk_live_51KB2fZJb4IVAatoGPTcDxwy6Ktx8pcAYFBeYRE6JEUq4fKiyxXpiWPWuCeA5XNzmqNFUi9DwWiowngI594BjiXrY00BeFT0rTK",
      chargeAmount: null,
      chargeAmountError: false,
      clientSecret: null,
      payeeAccount: null,
    };
  },
  methods: {
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
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
          payerTenantId: this.event.tenantId,
          payerUserId: this.$store.state.user.userId,
          chargeAmount: this.chargeAmount * 100,
          currencyType: this.payeeAccount.default_currency,
          payeeId: this.payeeAccount.id,
        };
        this.$store
          .dispatch("stripeCreatePaymentIntent", payload)
          .then((res) => {
            console.log(res);
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
          balanceOutstanding(this.event.invoice, this.event.data) / 100
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
  components: { InputWithTitle },
  emits: ["submitPaymentIntent"],
  props: ["eventId", "event", "stripe"],
};
</script>
<style scoped>
#payment-intent-wrapper {
  display: flex;
  flex-direction: column;
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
</style>
