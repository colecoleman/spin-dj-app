<template>
  <div class="mobile-close-button no-print">
    <vue-svg svg="x-icon" customStyle="width: 14px; margin: auto" />
  </div>
</template>
<script>
import VueSvg from "../../assets/VueSvg.vue";

export default {
  components: { VueSvg },
};
</script>
<style scoped>
.mobile-close-button {
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5));
  position: fixed;
  display: flex;
  bottom: 25px;
  right: 25px;
  height: 45px;
  width: 45px;
  border-radius: 25px;
  background-color: var(--foregroundColor);
  border: 1px solid var(--textColor);
  z-index: 20;
}

</style>