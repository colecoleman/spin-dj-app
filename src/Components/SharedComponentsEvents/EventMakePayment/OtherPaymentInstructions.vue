<template>
  <div id="other-payment-instruction-wrapper">
    <h4>Other Payment Instructions:</h4>
    <p>{{ $store.state.businessSettings.payments.custom.instructions }}</p>
    <round-icon-button
      class="back-arrow"
      svg="back-arrow"
      @click="navigateBackwards"
    />
  </div>
</template>
<script>
import RoundIconButton from "../../SharedComponentsUI/RoundIconButton.vue";
export default {
  methods: {
    navigateBackwards() {
      this.$emit("navigate-backwards", "choosePaymentType");
    },
  },
  components: {
    RoundIconButton,
  },
  emits: ["navigate-backwards"],
};
</script>
<style scoped>
p {
  font-size: 10pt;
  max-width: 100%;
  width: 500px;
}

#other-payment-instruction-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.back-arrow {
  margin: 20px;
  width: 30px;
  height: 30px;
}
</style>