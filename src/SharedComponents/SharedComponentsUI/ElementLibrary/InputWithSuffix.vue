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
    </div>
    <div class="suffix">
      <p>{{ suffix }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
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
  },
  emits: ["input", "blur", "keydown"],
  props: ["type", "title", "error", "placeholder", "inputValue", "suffix"],
};
</script>
<style scoped>
.wrapper {
  /* width: auto; */
  min-width: 125px;
  max-width: 300px;
  border: 1px solid var(--textColor);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 10px 10px 10px 0;
  /* padding: 10px; */
}

.error {
  border: 1px solid red;
}

input {
  margin: 0 10px 0 10px;
  outline: none;
  border: none;
  width: 100%;
  max-width: 100%;
  /* height: 100%; */
}

.input-container {
  display: flex;
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
  border-left: none;
  border-radius: 0px 5px 5px 0px;
  padding: 5px 10px;
}
</style>
