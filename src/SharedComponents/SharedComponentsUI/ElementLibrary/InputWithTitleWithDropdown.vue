<template>
  <div
    :class="
      error
        ? 'error ' + 'input-with-dropdown-selection-parent'
        : 'input-with-dropdown-selection-parent'
    "
  >
    <p class="title">{{ title }}</p>
    <input
      type="text"
      v-model="value"
      :placeholder="placeholder"
      @blur="blur()"
      @keydown="keydown()"
    />
    <div class="dropdown" v-if="dropdownSelections.length > 0 && dropdownOpen">
      <div
        class="dropdown-item"
        v-for="(item, index) in dropdownSelections"
        :key="index"
        @click="dropdownSelected(item)"
      >
        <p class="item-name">{{ dropdownItemDisplay(item) }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdownOpen: true,
    };
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
    keydown() {
      this.dropdownOpen = true;
    },
    blur() {
      this.dropdownOpen = false;
      this.$emit("blur");
    },
    dropdownSelected(item) {
      this.$emit("dropdownSelected", item);
    },
    dropdownItemDisplay(item) {
      let str = "";
      this.dropdownDisplay.forEach((element) => {
        str = str + " " + item[element];
      });
      return str;
    },
  },
  emits: ["input", "blur", "keydown", "dropdownSelected"],
  props: [
    "title",
    "error",
    "placeholder",
    "inputValue",
    "dropdownSelections",
    "dropdownDisplay",
  ],
};
</script>
<style scoped>
.input-with-dropdown-selection-parent {
  width: 100%;
  min-width: 125px;
  max-width: 300px;
  border: 1px solid var(--textColor);
  border-radius: 4px;
  /* position: relative; */
  background-color: var(--foregroundColor);
  z-index: 4;
  position: absolute;
  padding: 10px;
  margin: 10px 10px 10px 0;
}

.error {
  border: 1px solid red;
}

input {
  outline: none;
  border: none;
  width: 100%;
  max-width: 100%;
  height: 100%;
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

.dropdown {
  z-index: 10;
  max-height: 300px;
  overflow-y: scroll;
}

.item-name {
  font-weight: 600;
  width: 100%;
  /* height: 20px; */
  margin: 0;
  padding: 10px 0;
  cursor: pointer;
  border-top: 1px solid var(--textColor);
  vertical-align: middle;
}

.item-name:hover {
  text-decoration: underline;
}
</style>
