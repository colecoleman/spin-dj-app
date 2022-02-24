<template>
  <div
    :class="
      active
        ? 'active simple-city-select-option-dropdown'
        : 'simple-city-select-option-dropdown'
    "
    @click="dropdownClicked"
    @mousedown.prevent
  >
    <div class="heading-container">
      <p>{{ input ? input : title }}</p>
      <img :src="DropdownArrowSVG" alt="" />
    </div>
    <Transition>
      <div class="dropdown" v-if="active">
        <div
          class="dropdown-item"
          v-for="(option, index) in options"
          :key="index"
          @click="optionChosen(option)"
        >
          <p>{{ option }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script>
import { DropdownArrowSVG } from "../../../assets/SVGs/svgIndex.js";
export default {
  data() {
    return {
      DropdownArrowSVG,
      active: false,
      input: undefined,
    };
  },
  methods: {
    dropdownClicked() {
      this.active = !this.active;
    },
    optionChosen(option) {
      this.input = option;
      this.$emit("input", option);
    },
  },
  created() {},
  components: {},
  props: ["title", "options"],
  emits: ["input"],
};
</script>
<style scoped>
.simple-city-select-option-dropdown {
  /* position: absolute; */
  z-index: 3;
  width: fit-content;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: var(--textColor);
  background-color: var(--foregroundColor);
  border: 1px solid var(--textColor);
  border-radius: 7px;
  cursor: pointer;
  padding: 8px;
}

.heading-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.dropdown {
  width: 100%;
  height: fit-content;
  margin-top: 5px;
  border-top: 1px solid var(--textColor);
}

.dropdown-item {
  margin: 10px 0;
}

.dropdown-item:hover {
  font-weight: bolder;
}

.active {
  z-index: 4;
}

.active img {
  transform: rotate(180deg);
}

p {
  margin: 0;
}

img {
  margin: 0 5px;
}

.v-enter-active {
  transition: opacity 0.5s ease;
}

.v-enter-from {
  opacity: 0;
}
</style>