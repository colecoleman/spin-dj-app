<template>
  <div class="round-button-wrapper" @mousedown.prevent="">
    <vue-svg
      :svg="svg === 'loading' ? 'spinner' : svg"
      :class="svg === 'loading' ? 'spinning svg' : 'svg'"
    />
  </div>
</template>
<script>
import VueSvg from "../../assets/VueSvg.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  components: {
    VueSvg,
  },
  props: ["svg", "loading"],
};
</script>
<style scoped>
.round-button-wrapper {
  width: 25px;
  min-width: 25px;
  height: 25px;
  min-height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: var(--foregroundColor);
  filter: drop-shadow(0px 1px 1px var(--cardOutline));
  margin: 10px;
}

.round-button-wrapper:hover {
  filter: drop-shadow(0px 2px 2px var(--cardOutline));
}

.svg {
  width: 60%;
  max-height: 60%;
  min-width: 14px;
  min-height: 14px;
}

.spinning {
  animation-name: spin;
  animation-duration: 1s;
  animation-direction: normal;
  animation-iteration-count: infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
