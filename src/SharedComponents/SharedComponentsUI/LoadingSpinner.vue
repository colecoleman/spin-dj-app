<template>
  <div class="loader"></div>
</template>

<script>
export default {};
</script>

<style scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;

  border-top: 2px solid #ffffff; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>