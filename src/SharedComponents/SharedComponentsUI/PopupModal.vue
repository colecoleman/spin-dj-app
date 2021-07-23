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
      <slot name="window"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {},
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
  background-color: white;
  border-radius: 14px;
}
</style>

