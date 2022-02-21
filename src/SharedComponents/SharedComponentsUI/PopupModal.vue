<template>
  <backdrop @click="closePopup"></backdrop>
  <div class="window">
    <base-card
      :actionIcon="XIconSvg"
      @action-one-clicked="closePopup()"
      :title="title"
    >
      <template v-slot:content><slot name="window"></slot></template>
    </base-card>
  </div>
</template>

<script>
import XIconSvg from "../../assets/SVGs/x-icon.svg";
import Backdrop from "../SharedComponentsUI/Backdrop.vue";
export default {
  data() {
    return {
      XIconSvg,
    };
  },
  methods: {
    closePopup() {
      this.$emit("close-popup");
    },
  },
  props: ["title"],
  emits: ["close-popup"],
  components: { Backdrop },
};
</script>

<style scoped>
.window {
  position: fixed;
  z-index: 10;
  width: 80%;
  left: 10%;
  top: 15%;
  height: fit-content;
  border-radius: 14px;
}

@media screen and (min-width: 850px) {
  .window {
    position: fixed;
    z-index: 10;
    width: 40%;
    left: 30%;
    height: fit-content;
    top: auto;
    border-radius: 14px;
  }
}
</style>

