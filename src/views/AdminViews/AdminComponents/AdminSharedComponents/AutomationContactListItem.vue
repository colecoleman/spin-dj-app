<template>
  <div id="item-wrapper">
    <div id="left-div">
      <h5>{{ automationItem.title }}</h5>
      <p>{{ formatDate(automationItem.performDate) }}</p>
    </div>
    <div id="right-div">
      <button-standard-with-icon
        text="Approve"
        :icon="svg.circleCheckmarkSvg"
        @click="approveAutomation"
      >
      </button-standard-with-icon>
      <square-icon-button @click="deleteAutomation">
        <template v-slot:icon> </template>
      </square-icon-button>
    </div>
  </div>
</template>

<script>
import SquareIconButton from "../../../../SharedComponents/SharedComponentsUI/TrashButtonIcon.vue";
import circleCheckmarkSvg from "../../../../assets/SVGs/circle-checkmark.svg";
import helpers from "../../../../helpers.js";

export default {
  data() {
    return {
      svg: {
        circleCheckmarkSvg,
      },
    };
  },
  methods: {
    formatDate: helpers.formatDate,
    approveAutomation() {
      console.log("clicked");
      let id = this.automationItem.id;
      this.$store.dispatch("approveAutomation", id);
    },
    deleteAutomation() {
      console.log("clicked");
      let id = this.automationItem.id;
      this.$store.dispatch("deleteAutomation", id);
    },
  },
  props: ["automation-item"],
  components: { SquareIconButton },
};
</script>

<style scoped>
#item-wrapper {
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#left-div {
  text-align: left;
  max-width: 50%;
}
#right-div {
  max-width: 50%;
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>