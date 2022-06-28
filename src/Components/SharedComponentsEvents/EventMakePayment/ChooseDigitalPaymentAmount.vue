<template>
  <div id="payment-amounts-wrapper">
    <h4 class="main-body-heading">Choose Amount:</h4>
    <div id="choose-payment-amount-items">
      <item-tile
        v-for="(amount, index) in paymentAmounts"
        :key="index"
        @click="paymentAmountClickHandler(amount)"
      >
        <p>{{ amount.name }}</p>
        <h3 v-if="amount.amount !== 'input'" class="dollar-amount">
          {{ formatPrice(amount.amount) }}
        </h3>
        <div id="custom-amount-wrapper" v-if="amount.amount === 'input'">
          <input
            class="dollar-amount"
            id="custom-amount-input"
            type="text"
            v-model="customAmountInput"
            placeholder="0"
          />
          <Transition name="fade">
            <round-icon-button
              v-if="customInputActive"
              svg="circle-checkmark"
              @click="submitPaymentAmount(customAmount)"
            />
          </Transition>
        </div>
      </item-tile>
    </div>
    <round-icon-button
      class="back-arrow"
      svg="back-arrow"
      @click="navigateBackward"
    />
  </div>
</template>
<script>
import { formatPrice, balanceOutstanding } from "../../../helpers.js";
import RoundIconButton from "../../SharedComponentsUI/RoundIconButton.vue";
import ItemTile from "../../SharedComponentsUI/ItemTile.vue";
export default {
  data() {
    return {
      customAmount: undefined,
      customInputActive: false,
      payeeAccount: undefined,
      stripe: undefined,
    };
  },
  computed: {
    customAmountInput: {
      get() {
        return `${this.currencySymbol}${
          this.customAmount ? this.customAmount : ""
        }`;
      },
      set(val) {
        this.customAmount = val.replace(/[^0-9.-]/g, "");
      },
    },
    paymentAmounts() {
      let event = this.event;
      let calculateBudgetedAmount = () => {
        let todaysDate = new Date();
        let eventDate = new Date(event.data.date);
        let monthCount =
          eventDate.getMonth() -
          todaysDate.getMonth() +
          12 * (eventDate.getFullYear() - todaysDate.getFullYear());
        return balanceOutstanding(event.invoice, event.data) / monthCount;
      };
      return [
        {
          name: "Budgeted",
          amount: calculateBudgetedAmount(),
        },
        {
          name: "Outstanding",
          amount: balanceOutstanding(event.invoice, event.data),
        },
        {
          name: "Custom",
          amount: "input",
        },
      ];
    },
    currencySymbol() {
      let currency = this.$store.getters.currencyCode;
      return (0)
        .toLocaleString("lookup", {
          style: "currency",
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
        .replace(/\d/g, "")
        .trim();
    },
  },
  methods: {
    formatPrice,
    navigateBackward() {
      this.$emit("navigate-backwards", "choosePaymentType");
    },
    paymentAmountClickHandler(type) {
      if (type.name !== "Custom") {
        this.submitPaymentAmount(type.amount);
      } else {
        this.customInputActive = true;
      }
    },
    submitPaymentAmount(amount) {
      if (parseInt(amount) > 0) {
        if (this.customInputActive) {
          this.createPaymentIntent(Math.round(amount * 100));
        } else {
          this.createPaymentIntent(Math.round(amount));
        }
      }
    },
    createPaymentIntent(amount) {
      console.log(amount);
      let payload = {
        eventId: this.event.userId,
        tenantId: this.event.tenantId,
        payerName:
          this.$store.state.user.given_name +
          " " +
          this.$store.state.user.family_name,
        payerTenantId: this.$store.state.user.tenantId,
        payerUserId: this.$store.state.user.userId,
        chargeAmount: amount,
        currencyType: this.payeeAccount.default_currency,
        payeeId: this.payeeAccount.id,
      };
      console.log(payload);
      this.$store.dispatch("stripeCreatePaymentIntent", payload).then((res) => {
        console.log(res);
        this.$emit("payment-intent-created", res);
      });
    },
  },
  async created() {
    this.payeeAccount = await this.$store.dispatch("stripeCheckAccount");
    console.log(this.payeeAccount);
  },
  components: { RoundIconButton, ItemTile },
  emits: [
    "navigate-backward",
    "submit-payment-amount",
    "payment-intent-created",
  ],
  props: ["event"],
};
</script>
<style scoped>
#payment-amounts-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
}

.main-body-heading {
  text-transform: unset;
  margin: 30px;
}

#choose-payment-amount-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

#choose-payment-amount-items div {
  margin: 10px;
}

.dollar-amount {
  font-size: 18pt;
  margin: 0;
}

#custom-amount-wrapper {
  display: flex;
  justify-content: center;
  max-width: 80%;
}

#custom-amount-input {
  border: none;
  background: none;
  text-align: center;
  padding: 0 0 0 5px;
  max-width: 60%;
}

#custom-amount-input:focus {
  outline: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: fixed;
  left: 0;
}

.back-arrow {
  margin: 20px;
  width: 30px;
  height: 30px;
}

@media screen and (min-width: 800px) {
  #payment-amounts-wrapper {
    justify-content: center;
    min-height: 300px;
  }

  .main-body-heading {
    margin: 0 0 30px 0;
  }

  #choose-payment-amount-items {
    flex-direction: row;
    justify-content: space-evenly;
  }
}
</style>