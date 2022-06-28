<template>
  <div class="backdrop">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.25);
  filter: blur(0px);
  z-index: 100;
  backdrop-filter: blur(3px);
}

@media print {
  .backdrop {
    position: unset;
    width: unset;
    height: unset;
    top: unset;
    left: unset;
    background-color: white;
    filter: unset;
    /* display: none; */
  }
}
</style>