<template>
  <base-card>
    <template v-slot:content>
      <div class="button-parent">
        <div class="button-div" v-for="(button, index) in buttons" :key="index">
          <button-standard-with-icon
            :text="button.title"
            @click="
              button.action ? button.action() : buttonClicked(button.parameter)
            "
          />
        </div>

        <div class="button-div" v-if="dropdown">
          <button-with-drop-down-selections
            :text="dropdown.title"
            :actions="dropdown.actionItems"
            @button-clicked="dropdownButtonClicked"
            class="dropdown-button"
          />
        </div>
      </div>
    </template>
  </base-card>
</template>

<script>
import ButtonStandardWithIcon from "./ButtonStandardWithIcon.vue";

import ButtonWithDropDownSelections from "./ButtonWithDropDownSelections.vue";

export default {
  components: {
    ButtonWithDropDownSelections,
    ButtonStandardWithIcon,
  },
  methods: {
    buttonClicked(parameter) {
      this.$emit("button-clicked", parameter);
    },
    dropdownButtonClicked(parameter) {
      this.$emit("dropdown-button-clicked", parameter);
    },
  },
  emits: ["button-clicked", "dropdown-button-clicked"],
  props: ["buttons", "dropdown"],
};
</script>

<style scoped>
@media screen {
  .button-parent {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    height: fit-content;
    overflow: visible;
    padding: 10px;
    z-index: 100;
  }
  .button-div {
    width: 45%;
    height: 60px;
    padding: 10px 0;
    position: relative;
    overflow: visible;
    z-index: 100;
    /* box-sizing: border-box; */
  }
  @media (min-width: 700px) {
    .button-div {
      width: 23%;
      height: 60px;
      overflow: visible;
      min-height: 60px;
    }
  }
}
</style>