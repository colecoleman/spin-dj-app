<template>
  <div
    :class="
      checked
        ? disabled
          ? 'item-with-actionable-icon-wrapper checked disabled-button'
          : 'item-with-actionable-icon-wrapper checked'
        : disabled
        ? 'item-with-actionable-icon-wrapper disabled-button'
        : 'item-with-actionable-icon-wrapper'
    "
    @click="click"
  >
    <p class="title" v-if="title">{{ title }}</p>
    <p class="item">{{ item }}</p>
    <vue-svg v-if="checked == true" svg="x-icon" class="svg" />
  </div>
</template>
<script>
import VueSvg from "../../../assets/VueSvg.vue";
export default {
  methods: {
    click() {
      if (!this.disabled) {
        this.$emit("clicked");
      }
    },
  },
  components: {
    VueSvg,
  },
  emits: ["clicked"],
  props: ["item", "checked", "title", "disabled"],
};
</script>
<style scoped>
.item-with-actionable-icon-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid var(--textColor);
  outline: none;
  width: fit-content;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 25px;
}

.disabled-button {
  opacity: 0.25;
  cursor: default;
}

.item-with-actionable-icon-wrapper:hover {
  border: 2px solid var(--highlightColor);
}

.disabled-button:hover {
  border: 1px solid var(--textColor);
}
.checked {
  background-color: var(--textColor);
  border: 2px solid var(--highlightColor);
  color: var(--foregroundColor);
}

.svg {
  width: 10px;
  margin: 0 0px 0 10px;
}

.item {
  color: inherit;
  font-family: roboto, sans-serif;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.checked .title {
  border: 1px solid var(--highlightColor);
  background-color: var(--highlightColor);
  border-radius: 5px;
}

.title {
  font-family: roboto, sans-serif;
  font-size: 7pt;
  font-weight: 600;
  text-transform: uppercase;
  position: absolute;
  margin: 0;
  top: -6px;
  background-color: var(--foregroundColor);
  padding: 0 5px;
}
</style>