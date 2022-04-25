<template>
  <div class="input-with-dropdown-selection-parent">
    <p class="title">{{ title }}</p>
    <div class="selection-wrapper" @click="toggleDropdown()">
      <p class="item-name current-selection" v-if="optionsLoaded">
        {{ dropdownItemDisplay(value) }}
      </p>
      <div class="skeleton" v-if="!optionsLoaded"></div>
      <vue-svg svg="down-arrow" />
    </div>
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
import VueSvg from "../../../assets/VueSvg.vue";
export default {
  data() {
    return {
      dropdownOpen: false,
    };
  },
  computed: {
    value() {
      if (this.inputValue !== undefined) {
        return this.inputValue;
      } else {
        return this.dropdownSelections[0];
      }
    },
    optionsLoaded() {
      if (typeof this.value === "string" || typeof this.value === "undefined") {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    dropdownSelected(item) {
      this.$emit("dropdownSelected", item);
      this.toggleDropdown();
    },
    dropdownItemDisplay(item) {
      let str = "";
      this.dropdownDisplay.forEach((element) => {
        str = str + " " + item[element];
      });
      return str;
    },
  },
  emits: ["dropdownSelected"],
  props: ["title", "inputValue", "dropdownSelections", "dropdownDisplay"],
  components: { VueSvg },
};
</script>
<style scoped>
.input-with-dropdown-selection-parent {
  border: 1px solid var(--cardOutline);
  border-radius: 4px;
  background-color: var(--foregroundColor);
  z-index: 5;
  padding: 5px;
}

.selection-wrapper {
  display: flex;
  flex-direction: row;
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
  padding-top: 10px;
  max-height: 300px;
  overflow-y: scroll;
}

.item-name {
  font-weight: 600;
  /* width: 100%; */
  /* height: 20px; */
  margin: 0;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  border-top: 1px solid var(--cardOutline);
  text-align: left;
}

.skeleton {
  width: 100%;
  min-height: 100%;
  border-radius: 3px;
  background-color: var(--cardOutline);
  z-index: 10;
}

.current-selection {
  width: 100%;
  padding: 0;
  border: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.item-name:hover {
  text-decoration: underline;
}

@media screen and (min-width: 800px) {
  .input-with-dropdown-selection-parent {
    max-width: 300px;
    padding: 10px;
    margin: 10px 10px 10px 0;
  }
}
</style>
