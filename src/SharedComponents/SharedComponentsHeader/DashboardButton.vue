<template>
  <round-header-button-with-icon>
    <router-link to="/">
      <vue-svg svg="home" :customStyle="svgStyling" />
    </router-link>
  </round-header-button-with-icon>
</template>

<script>
import RoundHeaderButtonWithIcon from "./RoundHeaderButtonWithIcon.vue";
import VueSvg from "../../assets/VueSvg.vue";

export default {
  data() {
    return {
      svgStyling: "width: 50%; height: 50%;",
    };
  },
  components: { VueSvg, RoundHeaderButtonWithIcon },
};
</script>

