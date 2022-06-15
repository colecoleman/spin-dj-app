<template>
  <div
    :class="
      checked
        ? 'item-with-actionable-icon-wrapper checked'
        : 'item-with-actionable-icon-wrapper'
    "
    @click="click"
  >
    <p class="title" v-if="title">{{ title }}</p>
    <p class="item">{{ item }}</p>
    <vue-svg v-if="checked == true" svg="x-icon" class="svg" />
  </div>
  <div
    v-if="checked"
    :class="
      checked
        ? 'item-with-actionable-icon-wrapper checked'
        : 'item-with-actionable-icon-wrapper'
    "
  >
    <input type="text" v-model.number="modifier" @change="numberChange" />
  </div>
</template>
<script>
import VueSvg from "../../../assets/VueSvg.vue";
export default {
  data() {
    return {
      modifier: 10,
    };
  },
  methods: {
    click() {
      this.$emit("clicked");
    },
    numberChange() {
      this.$emit("numberChange", this.modifier);
    },
  },
  components: {
    VueSvg,
  },
  emits: ["clicked", "numberChange"],
  props: ["item", "checked", "title", "defaultValue"],
};
</script>
<style scoped>
.item-with-actionable-icon-wrapper {
  cursor: pointer;
  display: flex;
  position: relative;
  align-items: center;
  /* background-color: var(--highlightColor); */
  border: 1px solid var(--textColor);
  width: fit-content;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 25px;
}

.item-with-actionable-icon-wrapper:hover {
  border: 2px solid var(--highlightColor);
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
.checked {
  background-color: var(--textColor);
  border: 2px solid var(--highlightColor);
  color: var(--foregroundColor);
}

.item {
  color: inherit;
  font-family: roboto, sans-serif;
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.svg {
  width: 10px;
  margin: 0 0px 0 10px;
}

input {
  /* margin: 0 5px; */
  padding: 0;
  margin: 0;
  background: none;
  color: var(--foregroundColor);
  outline: none;
  border: none;
  width: 30px;
}
</style>