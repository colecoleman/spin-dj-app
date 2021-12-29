<template>
  <base-card>
    <template v-slot:title>Payments</template>
    <template v-slot:content>
      <div class="payments-wrapper">
        <div class="payments-item">
          <h4>Credit Card</h4>
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
          <select name="check" id="" v-model="check.enabled">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <p>Instructions for mailing a check:</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="check.instructions"
          ></textarea>
        </div>
        <div class="payments-item">
          <h4>Give clients another way to pay:</h4>
          <p>Custom Payment Name:</p>
          <input type="text" v-model="custom.name" />
          <p>Custom Payment Description:</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="custom.instructions"
          ></textarea>
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import SVGs from "../../../../assets/SVGs/svgIndex";

export default {
  data() {
    return {
      SVGs,
      creditCard: {
        enabled: false,
        Stripe: {},
        QuickBooks: {},
        Square: {},
      },
      p2p: {
        PayPal: {},
        Venmo: {},
      },
      check: {},
      custom: {},
    };
  },
  computed: {
    paymentSettings() {
      return this.$store.state.businessSettings.payments;
    },
    stripeHealthy() {
      if (!this.$store.state.businessSettings.payments.creditCard.Stripe.id) {
        return undefined;
      } else {
        return this.checkStripeAccountStatus();
      }
    },
  },
  created() {
    console.log(this.$store.state.businessSettings.payments.creditCard);
  },
  methods: {
    async checkStripeAccountStatus() {
      this.$store.dispatch("stripeCheckAccount").then((res) => {
        console.log(res);
        if (res.charges_enabled) {
          return true;
        } else {
          return false;
        }
      });
    },
    async createStripeAccountLink() {
      let stripeId;
      if (this.$store.state.businessSettings.payments.creditCard.Stripe.id) {
        stripeId =
          this.$store.state.businessSettings.payments.creditCard.Stripe.id;
      }
      this.$store
        .dispatch("stripeCreateAccount", stripeId)
        .then(async (res) => {
          console.log(res);
          this.$store.state.businessSettings.payments.creditCard.Stripe = {
            id: res.data.id.id,
          };
          console.log(this.$store.state.businessSettings);
          this.$store.dispatch("updateBusinessSettings").then(() => {
            window.location.href = res.data.url;
          });
          // console.log(res);
        });
    },
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

.bold {
  font-weight: 600;
  margin-top: 20px;
}

.x-icon {
  height: 10px;
  width: 10px;
  margin: 0px 5px;
}
</style>