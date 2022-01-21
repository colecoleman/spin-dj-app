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
  <!-- </div> -->
</template>

<script>
import XIconSvg from "../../assets/SVGs/x-icon.svg";
import Backdrop from "../SharedComponentsUI/Backdrop.vue";
export default {
  data() {
    return {
      XIconSvg,
      isVisible: false,
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
.popup-modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}

.window {
  position: fixed;
  z-index: 10;
  width: 40%;
  height: 80%;
  top: 10%;
  left: 30%;
  /* height: fit-content; */
  /* padding: 40px; */
  /* width: fit-content; */
  border-radius: 14px;
}
/* 
img {
  width: 14px;
  height: 14px;
  position: absolute;
  right: 20px;
  top: 20px;
} */
</style>

