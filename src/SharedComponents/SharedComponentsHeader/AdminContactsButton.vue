<template>
  <round-header-button-with-icon>
    <router-link to="/admin/contacts">
      <vue-svg svg="group-people" :customStyle="svgStyling" />
    </router-link>
  </round-header-button-with-icon>
</template>
<script>
import VueSvg from "../../assets/VueSvg.vue";
import RoundHeaderButtonWithIcon from "./RoundHeaderButtonWithIcon.vue";
export default {
  data() {
    return {
      svgStyling: "width: 40%; height: 40%;",
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
<style scoped>
a {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
