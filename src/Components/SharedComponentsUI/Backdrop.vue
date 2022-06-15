<template>
  <div class="backdrop"></div>
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
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.25);

  filter: blur(0px);
}

@media print {
  .backdrop {
    display: none;
  }
}
</style>