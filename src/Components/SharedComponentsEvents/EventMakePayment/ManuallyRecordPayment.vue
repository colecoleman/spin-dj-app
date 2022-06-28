<template>
  <div id="manual-payment-record-wrapper">
    <h4>Manually Record Payment:</h4>

    <div class="input-wrapper">
      <input-with-title
        type="text"
        title="Reference"
        :error="paymentNameError"
        @input="titleInput"
      />
      <input-with-title
        type="number"
        title="Amount"
        :error="paymentAmountError"
        @input="numberInput"
      />
    </div>
    <div class="button-wrapper">
      <round-icon-button svg="back-arrow" @click="navigateBackwards" />
      <round-icon-button svg="circle-checkmark" @click="submitManualPayment" />
    </div>
  </div>
</template>
<script>
import InputWithTitle from "../../SharedComponentsUI/ElementLibrary/InputWithTitle.vue";

import RoundIconButton from "../../SharedComponentsUI/RoundIconButton.vue";
export default {
  data() {
    return {
      payment: {
        name: undefined,
        amount: undefined,
      },
      paymentNameError: false,
      paymentAmountError: false,
    };
  },
  computed: {},
  methods: {
    titleInput(val) {
      this.payment.name = val;
    },
    numberInput(val) {
      this.payment.amount = val;
    },
    submitManualPayment() {
      if (this.payment.name && this.payment.amount) {
        let payment = {
          name: this.payment.name,
          amount: this.payment.amount * 100,
        };
        this.$emit("successful-payment", payment);
      } else {
        if (!this.payment.amount) {
          this.paymentAmountError = true;
        }
        if (!this.payment.name) {
          this.paymentNameError = true;
        }
      }
    },
    navigateBackwards() {
      this.$emit("navigate-backwards", "choosePaymentType");
    },
  },
  created() {},
  components: {
    InputWithTitle,
    RoundIconButton,
  },
  props: [],
};
</script>
<style scoped>
#manual-payment-record-wrapper {
}

.input-wrapper {
  display: flex;
  margin: 20px;
}

.button-wrapper {
  display: flex;
}
</style>