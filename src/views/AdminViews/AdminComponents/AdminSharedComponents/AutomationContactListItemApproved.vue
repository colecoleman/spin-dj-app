<template>
  <div id="item-wrapper">
    <div id="left-div">
      <p>{{ automation.title }}</p>
      <p>{{ formatDate(automation.performDate) }}</p>
    </div>
    <div id="right-div">
      <img :src="SVGs.CircleCheckmarkSvg" alt="" />
      
      <square-icon-button @click="deleteAutomation">
        <template v-slot:icon> </template>
      </square-icon-button>
    </div>
  </div>
</template>

<script>
import SquareIconButton from "../../../../SharedComponents/SharedComponentsUI/TrashButtonIcon.vue";
import helpers from "../../../../helpers.js";
import SVGs from "../../../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
    };
  },
  methods: {
    deleteAutomation() {
      console.log("clicked");
      let id = this.automation.id;
      this.$store.dispatch("deleteApprovedAutomation", id);
    },
    formatDate: helpers.formatDate,
  },
  props: ["automation"],
  components: {
    SquareIconButton,
  },
};
</script>

<style scoped>
#item-w ButtonStandardWithIconrapper {
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#right-div {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

#left-div {
  text-align: left;
  width: 50%;
}

.approved {
  margin: 10px;
}
</style>