<template>
  <div id="backdrop"></div>
</template>

<script>
export default {};
</script>

<style scoped>
#backdrop {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
}
</style>