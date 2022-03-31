<template>
  <round-header-button-with-icon @click="logout()">
    <vue-svg svg="exit-door" :customStyle="svgStyling" />
  </round-header-button-with-icon>
</template>

<script>
import { Auth } from "aws-amplify";
import RoundHeaderButtonWithIcon from "./RoundHeaderButtonWithIcon.vue";
import VueSvg from "../../assets/VueSvg.vue";

export default {
  data() {
    return {
      svgStyling: "width: 35%; height: 35%; margin: auto;",
    };
  },
  methods: {
    async logout() {
      try {
        await Auth.signOut();
        this.$router.push("/login");
      } catch (e) {
        this.$store.disatch("addStatus", {
          type: "error",
          note: `Something went wrong: ${e}`,
        });
      }
    },
  },
  components: { VueSvg, RoundHeaderButtonWithIcon },
};
</script>
