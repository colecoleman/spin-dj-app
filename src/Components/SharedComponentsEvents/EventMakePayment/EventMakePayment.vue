<template>
  <backdrop @click.self="closePopup">
    <div id="make-payment-wrapper">
      <div id="invoice-details">
        <div
          class="invoice-detail"
          v-for="(detail, index) in invoiceDetails"
          :key="index"
        >
          <p>{{ detail.title }}</p>
          <h3>
            {{ detail.amount }}
          </h3>
        </div>
      </div>
      <div id="action-body">
        <component
          :is="activeComponent"
          class="make-payment-step"
          :event="event"
          :paymentIntent="paymentIntent"
          :stripePk="stripeAPIToken"
          @successful-payment="recordSuccessfulPayment"
          @payment-intent-created="setPaymentIntent"
          @navigate-backwards="navigate"
          @navigate-forward="navigate"
        />
      </div>
      <p class="due-date-reminder">
        Final payment is due on {{ finalPaymentDueDate }}
      </p>
    </div>
  </backdrop>
</template>
<script>
import Backdrop from "../../SharedComponentsUI/Backdrop.vue";
import ChooseDigitalPaymentAmount from "./ChooseDigitalPaymentAmount.vue";
import PhysicalPaymentInstructions from "./PhysicalPaymentInstructions.vue";
import OtherPaymentInstructions from "./OtherPaymentInstructions.vue";
import ChoosePaymentType from "./ChoosePaymentType.vue";
import StripeEnterCardDetails from "./Stripe/StripeEnterCardDetails.vue";
import ManuallyRecordPayment from "./ManuallyRecordPayment.vue";
import SuccessfulPaymentNotification from "./SuccessfulPaymentNotification.vue";
import {
  balanceOutstanding,
  total,
  formatPrice,
  finalPaymentDueDate,
  formatDate,
} from "../../../helpers.js";
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      method: "stripe",
      activeComponent: "choosePaymentType",
      stripe: null,
      payeeAccount: null,
      stripeAPIToken:
        // "pk_live_51KB2fZJb4IVAatoGPTcDxwy6Ktx8pcAYFBeYRE6JEUq4fKiyxXpiWPWuCeA5XNzmqNFUi9DwWiowngI594BjiXrY00BeFT0rTK",
        "pk_test_51KB2fZJb4IVAatoGYdJekSis2i0uQilzUHqTvfE3P6x7OJkDhdahSWKMzCocECTUslikYgWZTAvr1npNMGUNaWm800To81qBha",
      step: 1,
      manualPayment: {
        name: undefined,
        amount: undefined,
      },
      paymentNameError: false,
      paymentAmountError: false,
      paymentIntent: undefined,
      clientSecret: undefined,
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
    invoiceDetails() {
      return [
        {
          title: "Total",
          amount: formatPrice(total(this.event.invoice, this.event.data)),
        },
        {
          title: "Payments Made",
          amount: formatPrice(
            total(this.event.invoice, this.event.data) -
              balanceOutstanding(this.event.invoice, this.event.data)
          ),
        },
        {
          title: "Outstanding",
          amount: formatPrice(
            balanceOutstanding(this.event.invoice, this.event.data)
          ),
        },
      ];
    },
    finalPaymentDueDate() {
      return formatDate(
        finalPaymentDueDate(
          this.event.data,
          this.$store.state.businessSettings.payments.finalPayment
        )
      );
    },
  },
  methods: {
    balanceOutstanding,
    total,
    formatPrice,
    navigate(component) {
      this.activeComponent = component;
    },

    setPaymentIntent(intent) {
      this.paymentIntent = intent.data;
      this.clientSecret = intent.data.client_secret;
      this.navigate("StripeEnterCardDetails");
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
    recordSuccessfulPayment(intent) {
      this.paymentIntent = intent;
      this.$store.commit("addPaymentToEvent", {
        name: intent.name,
        amount: intent.amount,
      });
      this.navigate("successfulPaymentNotification");
    },
    closePopup() {
      this.$emit("close-popup");
    },
  },

  async created() {
    this.payeeAccount = await this.$store.dispatch("stripeCheckAccount");
    this.stripe = await loadStripe(this.stripeAPIToken, {
      stripeAccount: this.payeeAccount.id,
    });
    console.log(this.$store.state.businessSettings.payments);
  },
  components: {
    StripeEnterCardDetails,
    SuccessfulPaymentNotification,
    PhysicalPaymentInstructions,
    ChoosePaymentType,
    ManuallyRecordPayment,
    OtherPaymentInstructions,
    ChooseDigitalPaymentAmount,
    Backdrop,
  },
  emits: ["apply-manual-payment", "close-popup"],
  props: ["event"],
};
</script>
<style scoped>
#make-payment-wrapper {
  position: fixed;
  top: calc(20% - 40px);
  left: 10%;

  height: calc(60% + 40px);
  width: 80%;
  min-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 10px;
  padding: 20px 0;

  background-color: var(--foregroundColor);
  filter: drop-shadow(0px 4px 3px var(--cardOutline));
}

#invoice-details {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  height: 60px;
  width: calc(100% - 40px);
}

.invoice-detail {
  border-right: 1px solid var(--cardOutline);
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.invoice-detail > p {
  margin: 0;
}

.invoice-detail > h3 {
  margin: 3px;
  font-size: 10pt;
}

.invoice-detail:last-child {
  border: none;
}

#action-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: auto;
  width: 100%;
}

.make-payment-step {
  width: 100%;
  max-width: 90%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.due-date-reminder {
  right: 13px;
  bottom: 3px;
  height: 10px;
}
@media screen and (min-width: 800px) {
  #make-payment-wrapper {
    top: calc(50% - 200px);
    left: calc(50% - 300px);
    width: 600px;
    min-width: 50%;
    height: 400px;
    padding: 20px;
    flex-direction: row;
    align-items: center;
  }

  #invoice-details {
    flex-direction: column;
    height: 100%;
    width: 130px;
  }

  .invoice-detail {
    border-bottom: 1px solid var(--cardOutline);
    border-right: 0;
  }

  .invoice-detail > h3 {
    font-size: 18pt;
  }

  #action-body {
    justify-content: center;
  }

  .make-payment-step {
    /* min-height: 300px; */
    /* height: 100%; */
    width: 100%;
    max-width: 90%;
    box-sizing: border-box;
  }

  .due-date-reminder {
    position: absolute;
    right: 13px;
    bottom: 3px;
  }
}
</style>
