<template>
  <div class="popup-modal">
    <div class="window">
      <h5>Hi</h5>
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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.014);
}

.window {
  position: relative;
  height: fit-content;
  padding: 40px;
  width: 50%;
  top: 30%;
  left: 25%;
  background-color: white;
  border-radius: 14px;
}
</style>