<template>
  <base-card v-if="loaded" title="Payments">
    <template v-slot:content>
      <div class="payments-wrapper">
        <div class="payments-item">
          <h4>Business Information:</h4>
          <input-with-title
            title="Currency Code:"
            type="select"
            :options="currencyCodes"
            :inputValue="businessCurrencyCode"
            @input="fieldInput(undefined, 'businessCurrencyCode', $event)"
          />
        </div>
        <div class="payments-item">
          <h4>Deposit:</h4>
          <input-with-title
            title="Preferred Terminology:"
            type="select"
            :options="depositTerminologies"
            :inputValue="depositTerminology"
            @input="fieldInput(undefined, 'depositTerminology', $event)"
          />

          <input-with-title
            title="Deposit Required To Reserve Services:"
            type="number"
            :inputValue="depositAmount"
            @input="fieldInput(undefined, 'depositAmount', $event)"
          />
          <input-with-title
            title="Type:"
            type="select"
            :options="depositTypes"
            :inputValue="depositType"
            @input="fieldInput(undefined, 'depositType', $event)"
          />
        </div>
        <div class="payments-item">
          <h4>Final Payment Due:</h4>

          <input-with-title
            title="Increment:"
            type="number"
            :inputValue="finalPaymentIncrement"
            @input="fieldInput(undefined, 'finalPaymentIncrement', $event)"
          />
          <input-with-title
            title="Increment Type: (prior to event date)"
            type="select"
            :inputValue="finalPaymentType"
            :options="paymentIncrementTypes"
            @input="fieldInput(undefined, 'finalPaymentType', $event)"
          />
        </div>
        <div class="payments-item">
          <h4>Credit Card</h4>
          <input-with-title
            title="Enable Credit Card Payments?"
            type="select"
            :options="trueFalse"
            :inputValue="creditCardEnabled"
            @input="fieldInput(undefined, 'creditCardEnabled', $event)"
          />

          <input-with-title
            title="Select preferred credit card processor (Stripe is default):"
            type="select"
            :options="['stripe']"
          />
          <div v-if="!paymentSettings.creditCard.Stripe.id">
            <button-standard-with-icon
              @click="createStripeAccountLink"
              text="Create Account With Stripe"
            />
          </div>

          <div v-if="paymentSettings.creditCard.Stripe.id">
            <button-standard-with-icon
              @click="stripeHealthy ? '' : createStripeAccountLink"
              :text="
                stripeHealthy ? 'Status: Healthy' : 'Complete Stripe Setup'
              "
            />
          </div>
        </div>
        <div class="payments-item">
          <h4>Check</h4>
          <input-with-title
            title="Allow clients to pay by check?"
            type="select"
            :options="trueFalse"
            :inputValue="checkEnabled"
            @input="fieldInput(undefined, 'checkEnabled', $event)"
          />

          <input-with-title
            title="Instructions for paying by check:"
            type="textarea"
            :inputValue="checkInstructions"
            @input="fieldInput(undefined, 'checkInstructions', $event)"
          />
        </div>
        <div class="payments-item">
          <h4>Give clients another way to pay:</h4>

          <input-with-title
            title="Custom Payment Name:"
            :inputValue="customName"
            @input="fieldInput(undefined, 'customName', $event)"
          />
          <input-with-title
            title="Custom Payment Description:"
            type="textarea"
            :inputValue="customInstructions"
            @input="fieldInput(undefined, 'customInstructions', $event)"
          />
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import InputWithTitle from "../../../../../SharedComponents/SharedComponentsUI/ElementLibrary/InputWithTitle.vue";

export default {
  data() {
    return {
      loaded: false,
      currencyCodes: [
        "USD",
        "EUR",
        "JPY",
        "GBP",
        "AUD",
        "CAD",
        "CHF",
        "CNY",
        "HKD",
        "NZD",
        "SEK",
        "AED",
        "AFN",
        "ALL",
        "AMD",
        "ANG",
        "AOA",
        "ARS",
        "AWG",
        "AZN",
        "BAM",
        "BBD",
        "BDT",
        "BGN",
        "BHD",
        "BIF",
        "BMD",
        "BND",
        "BOB",
        "BOV",
        "BRL",
        "BSD",
        "BTN",
        "BWP",
        "BYN",
        "BZD",
        "CDF",
        "CHE",
        "CHW",
        "CLF",
        "CLP",
        "COP",
        "COU",
        "CRC",
        "CUC",
        "CUP",
        "CVE",
        "CZK",
        "DJF",
        "DKK",
        "DOP",
        "DZD",
        "EGP",
        "ERN",
        "ETB",
        "FJD",
        "FKP",
        "GEL",
        "GHS",
        "GIP",
        "GMD",
        "GNF",
        "GTQ",
        "GYD",
        "HNL",
        "HRK",
        "HTG",
        "HUF",
        "IDR",
        "ILS",
        "INR",
        "IQD",
        "IRR",
        "ISK",
        "JMD",
        "JOD",
        "KES",
        "KGS",
        "KHR",
        "KMF",
        "KPW",
        "KRW",
        "KWD",
        "KYD",
        "KZT",
        "LAK",
        "LBP",
        "LKR",
        "LRD",
        "LSL",
        "LYD",
        "MAD",
        "MDL",
        "MGA",
        "MKD",
        "MMK",
        "MNT",
        "MOP",
        "MRU",
        "MUR",
        "MVR",
        "MWK",
        "MXN",
        "MXV",
        "MYR",
        "MZN",
        "NAD",
        "NGN",
        "NIO",
        "NOK",
        "NPR",
        "OMR",
        "PAB",
        "PEN",
        "PGK",
        "PHP",
        "PKR",
        "PLN",
        "PYG",
        "QAR",
        "RON",
        "RSD",
        "RUB",
        "RWF",
        "SAR",
        "SBD",
        "SCR",
        "SDG",
        "SGD",
        "SHP",
        "SLL",
        "SOS",
        "SRD",
        "SSP",
        "STN",
        "SVC",
        "SYP",
        "SZL",
        "THB",
        "TJS",
        "TMT",
        "TND",
        "TOP",
        "TRY",
        "TTD",
        "TWD",
        "TZS",
        "UAH",
        "UGX",
        "USN",
        "UYI",
        "UYU",
        "UYW",
        "UZS",
        "VED",
        "VES",
        "VND",
        "VUV",
        "WST",
        "XAF",
        "XAG",
        "XAU",
        "XBA",
        "XBB",
        "XBC",
        "XBD",
        "XCD",
        "XDR",
        "XOF",
        "XPD",
        "XPF",
        "XPT",
        "XSU",
        "XTS",
        "XUA",
        "XXX",
        "YER",
        "ZAR",
        "ZMW",
        "ZWL",
      ],
      depositTerminologies: ["deposit", "retainer"],
      depositTypes: ["percentage", "dollar"],
      paymentIncrementTypes: ["days", "weeks", "months"],
      trueFalse: [true, false],
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
    businessCurrencyCode: {
      get() {
        if (this.paymentSettings.currencyCode) {
          console.log(this.paymentSettings.currencyCode);
          return this.paymentSettings.currencyCode;
        } else {
          return "USD";
        }
      },
      set(val) {
        return this.$store.commit(
          "adminConfigPaymentsSetBusinessCurrencyCode",
          val
        );
      },
    },
    depositAmount: {
      get() {
        if (this.paymentSettings.deposit) {
          return this.paymentSettings.deposit.amount;
        } else if (this.paymentSettings.depositAmount) {
          return this.paymentSettings.depositAmount;
        } else {
          return 0;
        }
      },
      set(val) {
        return this.$store.commit("adminConfigPaymentsSetDepositAmount", val);
      },
    },
    depositTerminology: {
      get() {
        if (this.paymentSettings.deposit) {
          return this.paymentSettings.deposit.terminology;
        } else {
          return "deposit";
        }
      },
      set(val) {
        return this.$store.commit(
          "adminConfigPaymentsSetDepositTerminology",
          val
        );
      },
    },
    depositType: {
      get() {
        if (this.paymentSettings.deposit) {
          return this.paymentSettings.deposit.type;
        } else {
          return "dollar";
        }
      },
      set(val) {
        return this.$store.commit("adminConfigPaymentsSetDepositType", val);
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
    fieldInput(object, property, value) {
      if (object) {
        object[property] = value;
      } else {
        this[property] = value;
      }
    },
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
  components: { InputWithTitle },
  props: ["DBpaymentInformation"],
};
</script>

<style scoped>
@media screen {
  p {
    font-size: 9pt;
  }

  .payments-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 100%;
    width: 100%;
    overflow-y: scroll;
    padding: 10px;
  }

  .payments-section {
    width: 90%;
  }

  .payments-item {
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 90%;
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
    width: 90%;
    align-self: left;
    justify-self: left;
  }

  .button-standard-with-icon {
    margin-top: 10px;
  }

  @media (min-width: 850px) {
    .payments-wrapper {
      flex-direction: column;
    }

    .payments-section {
      width: 50%;
    }

    .payments-item > input,
    .payments-item > select,
    .button-standard-with-icon {
      width: 50%;
    }
  }
}
</style>
