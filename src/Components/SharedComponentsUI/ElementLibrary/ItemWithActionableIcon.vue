<template>
  <div class="item-with-actionable-icon-wrapper">
    <p>{{ item }}</p>
    <vue-svg :svg="svg ? svg : 'x-icon'" class="svg" @clicked="click" />
  </div>
</template>
<script>
import VueSvg from "../../../assets/VueSvg.vue";
export default {
  data() {
    return {
      style: "width: 10px;",
    };
  },
  methods: {
    click() {
      this.$emit("clicked");
    },
  },
  created() {},
  components: {
    VueSvg,
  },
  emits: ["clicked"],
  props: ["item", "svg"],
};
</script>
<style scoped>
.item-with-actionable-icon-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid var(--textColor);
  width: fit-content;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 25px;
}

.svg {
  width: 10px;
  margin: 0 0 0 10px;
}

p {
  font-family: roboto, sans-serif;
  font-weight: 600;
  margin: 0;
  padding: 0;
}
</style>