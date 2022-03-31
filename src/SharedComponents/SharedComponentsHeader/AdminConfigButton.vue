<template>
  <round-header-button-with-icon>
    <router-link to="/admin/config">
      <vue-svg svg="wrench-gear" :customStyle="svgStyling" />
    </router-link>
  </round-header-button-with-icon>
</template>
<script>
import VueSvg from "../../assets/VueSvg.vue";
import RoundHeaderButtonWithIcon from "./RoundHeaderButtonWithIcon.vue";
export default {
  data() {
    return {
      svgStyling: "width: 50%; height: 50%;",
    };
  },
  methods: {},
  created() {},
  components: {
    RoundHeaderButtonWithIcon,
    VueSvg,
  },
  props: [],
};
</script>
