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
  height: 80%;
  width: 90%;
  top: 10%;
  left: 5%;
  padding: 0;
}
@media screen and (min-width: 800px) {
  .large-floating-card {
    left: 20%;
    top: 20%;
    padding: 20px;

    height: calc(60% - 40px);
    width: calc(60% - 40px);
  }
}
</style>