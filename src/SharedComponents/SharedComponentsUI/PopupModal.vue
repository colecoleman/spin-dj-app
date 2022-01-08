<template>
  <div class="popup-modal">
    <div class="window">
      <base-card
        :actionIcon="XIconSvg"
        @action-one-clicked="closePopup()"
        :title="title"
      >
        <template v-slot:content><slot name="window"></slot></template>
      </base-card>
    </div>
  </div>
</template>

<script>
import XIconSvg from "../../assets/SVGs/x-icon.svg";
import BaseCard from "./BaseCard.vue";
export default {
  components: { BaseCard },
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
};
</script>

<style scoped>
.popup-modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.4);
}

.window {
  position: relative;
  /* height: fit-content; */
  padding: 40px;
  width: fit-content;
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

