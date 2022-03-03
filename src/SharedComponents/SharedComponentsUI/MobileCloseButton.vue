<template>
  <div class="mobile-close-button no-print">
    <img :src="SVGs.XIconSVG" alt="close-button" />
  </div>
</template>
<script>
import SVGs from "../../assets/SVGs/svgIndex.js";
export default {
  data() {
    return {
      SVGs,
    };
  },
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

img {
  width: 14px;
  margin: auto;
}
</style>