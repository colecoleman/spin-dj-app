<template>
  <div class="round-button-wrapper">
    <vue-svg :svg="svg" />
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
  props: ["svg"],
};
</script>
<style scoped>
.round-button-wrapper {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 5px;
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  margin: 10px;
}
</style>