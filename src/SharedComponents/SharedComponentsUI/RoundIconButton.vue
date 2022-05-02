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
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 3px;
  border-radius: 20px;
  box-sizing: border-box;

  background-color: var(--foregroundColor);
  filter: drop-shadow(0px 1px 1px var(--cardOutline));
  /* border: 1px solid var(--cardOutline); */
  margin: 10px;
}

.round-button-wrapper:hover {
  filter: drop-shadow(0px 2px 2px var(--cardOutline));
}

@media screen and (min-width: 800px) {
  .round-button-wrapper {
    width: 35px;
    height: 35px;
    padding: 5px;
  }
}
</style>
