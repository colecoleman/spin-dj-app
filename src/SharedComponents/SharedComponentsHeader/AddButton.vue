
<template>
  <round-header-button-with-icon @click="newEvent()">
    <vue-svg svg="plus-sign" :customStyle="svgStyling" />
  </round-header-button-with-icon>
</template>

<script>
import VueSvg from "../../assets/VueSvg.vue";
import RoundHeaderButtonWithIcon from "./RoundHeaderButtonWithIcon.vue";
// import RightSideDrawer from "../SharedComponentsUI/RightSideDrawer.vue";

export default {
  data() {
    return {
      svgStyling: "width: 35%; height: 35%; margin: auto;",
      isClicked: false,
      items: [
        {
          text: "New Event",
          action: this.newEvent,
        },
        {
          text: "New Proposal",
          action: this.newProposal,
        },
      ],
    };
  },
  methods: {
    newEvent() {
      this.$router.push("/admin/createnewevent");
      this.isClicked = false;
    },
    newProposal() {
      this.$router.push("/admin/");
      this.isClicked = false;
    },
    closeDialog() {
      this.isClicked = false;
    },
  },
  emits: ["closeDrawer"],
  components: {
    VueSvg,
    RoundHeaderButtonWithIcon,
    // RightSideDrawer,
  },
};
</script>
