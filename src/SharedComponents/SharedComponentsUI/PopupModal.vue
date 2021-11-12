<template>
  <!-- Global Stylings Can Be Made With the Following Markups When Made Inside the Template Tags: -->
  <!-- importing global buttons: Parent: class="button-container" Child: class="black-outline" -->
  <!-- Example: 
      <div class="button-container">
        <button-standard-with-icon
          class="black-outline"
          text="Cancel Email"
          @click="cancelSendEmail()"
        ></button-standard-with-icon>
        <button-standard-with-icon
          class="black-outline"
          text="Send Email"
          @click="confirmSendEmail()"
        ></button-standard-with-icon>
      </div>  
 -->

  <!-- Popup Headings: class="popup-heading" -->
  <!-- Popup Text: class="popup-text" -->
  <div class="popup-modal">
    <div class="window">
      <img :src="XIconSvg" alt="" @click="closePopup()" />
      <slot name="window"></slot>
    </div>
  </div>
</template>

<script>
import XIconSvg from "../../assets/SVGs/x-icon.svg";
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
  height: fit-content;
  padding: 40px;
  width: 50%;
  background-color: var(--foregroundColor);
  border-radius: 14px;
}

img {
  width: 14px;
  height: 14px;
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>

