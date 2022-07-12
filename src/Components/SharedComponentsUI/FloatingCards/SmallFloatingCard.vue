<template>
  <backdrop @click.self="close">
    <floating-card class="large-floating-card">
      <slot></slot>
    </floating-card>
  </backdrop>
</template>
<script>
import FloatingCard from "../FloatingCard.vue";
import Backdrop from "../../SharedComponentsUI/Backdrop.vue";
export default {
  methods: {
    close() {
      this.$emit("close");
    },
  },
  components: {
    Backdrop,
    FloatingCard,
  },
  emits: ["close"],
};
</script>
<style scoped>
.large-floating-card {
  position: fixed;
  height: 70%;
  width: 80%;
  top: 15%;
  left: 10%;
  padding: 0;
}
@media screen and (min-width: 800px) {
  .large-floating-card {
    left: 30%;
    top: 30%;
    padding: 20px;

    height: calc(40% - 40px);
    width: calc(40% - 40px);
  }
}
</style>