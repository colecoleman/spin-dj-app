<template>
  <div :class="error ? 'error ' + type : type">
    <p>{{ title }}</p>
    <select v-model="value">
      <option v-for="(option, index) in options" :key="index" :value="option">
        <p>{{ option }}</p>
      </option>
    </select>
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
  props: ["type", "title", "error", "options", "inputValue"],
};
</script>
<style scoped>
div {
  /* width: auto; */
  max-width: 300px;
  border: 1px solid var(--textColor);
  border-radius: 4px;
  position: relative;
  padding: 10px;
  margin: 10px 10px 10px 0;
}

.error {
  border: 1px solid red;
}

select {
  outline: none;
  border: none;
  width: 100%;
  max-width: 100%;
  height: 100%;
}

.textarea {
  height: 50%;
}

p {
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
