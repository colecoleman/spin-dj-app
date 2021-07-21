<template>
  <base-card-no-heading>
    <div class="button-parent">
      <div class="button-div" v-for="button in buttons" :key="button.title">
        <button-standard-with-icon
          :text="button.title"
          @click="button.action"
        ></button-standard-with-icon>
      </div>

      <div class="button-div">
        <button-with-drop-down-selections
          :text="dropdown.title"
          :actions="dropdown.actionItems"
          class="dropdown-button"
        >
        </button-with-drop-down-selections>
      </div>
    </div>
  </base-card-no-heading>
</template>

<script>
import BaseCardNoHeading from "./BaseCardNoHeading.vue";
import ButtonStandardWithIcon from "./ButtonStandardWithIcon.vue";
import ButtonWithDropDownSelections from "./ButtonWithDropDownSelections.vue";

export default {
  components: {
    BaseCardNoHeading,
    ButtonStandardWithIcon,
    ButtonWithDropDownSelections,
  },
  props: ["buttons", "dropdown"],
};
</script>

<style scoped>
.button-parent {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.button-div {
  width: 25%;
  height: 100%;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.dropdown-button {
  display: flex;
  flex-direction: column;

  width: 90%;
  margin-top: 8.5px;
  margin-left: 5px;
  text-transform: uppercase;
  padding: 5px 5px 5px 5px;

  border-radius: 7px;
  fill: white;
  position: relative;
}

.dropdown-button > {
  height: calc(100% - 17px);
  /* align-self: center; */
}
</style>