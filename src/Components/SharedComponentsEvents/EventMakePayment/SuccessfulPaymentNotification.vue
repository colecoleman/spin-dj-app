<template>
  <div id="successful-payment-notification">
    <h1>Thank you!</h1>
    <p>
      Your payment of {{ formatPrice(paymentIntent.amount) }} was sucessful!
    </p>
  </div>
</template>
<script>
import { formatPrice } from "../../../helpers.js";
export default {
  methods: {
    formatPrice,
  },
  props: ["paymentIntent"],
};
</script>
<style scoped>
#successful-payment-notification {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

p {
  font-size: 14pt;
}
</style>