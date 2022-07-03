<template>
  <div class="wrapper">
    <div class="input-container">
      <p class="title">{{ title }}</p>

      <input
        :type="type"
        v-model="value"
        :placeholder="placeholder"
        @blur="blur()"
      />
      <div class="suffix">
        <p>{{ suffix }}</p>
      </div>
    </div>
    <vue-svg v-if="svg" class="svg" :svg="svg" @clicked="iconClicked" />
  </div>
</template>
<script>
import VueSvg from "../../../assets/VueSvg.vue";
export default {
  computed: {
    value: {
      get() {
        return this.inputValue;
      },
      set(val) {
        return this.$emit("input", val);
      },
    },
  },
  methods: {
    blur() {
      this.$emit("blur");
    },
    iconClicked() {
      this.$emit("iconClicked");
    },
  },
  components: { VueSvg },
  emits: ["input", "blur", "keydown", "iconClicked"],
  props: [
    "type",
    "title",
    "error",
    "placeholder",
    "inputValue",
    "suffix",
    "svg",
  ],
};
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin: 10px 10px 10px 0;
}

.input-container {
  min-width: 125px;
  max-width: 300px;
  border: 1px solid var(--cardOutline);
  border-radius: 4px;
  display: flex;
}
.error {
  border: 1px solid red;
}

.svg {
  height: 14px;
  width: 14px;
  margin: 10px;
}

input {
  margin: 0 10px 0 10px;
  outline: none;
  border: none;
  width: 100%;
  max-width: 100%;
  /* height: 100%; */
}

.title {
  font-family: roboto, sans-serif;
  font-size: 7pt;
  font-weight: 600;
  text-transform: uppercase;
  position: absolute;
  margin: 0;
  top: -6px;
  left: 10px;
  background-color: var(--foregroundColor);
  padding: 0 5px;
}

.suffix {
  background-color: var(--backgroundColor);
  padding: 5px 10px;
}
</style>
