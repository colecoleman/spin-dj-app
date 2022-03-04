<template>
  <div id="logout-button" @mousedown.prevent="">
    <vue-svg svg="exit-door" :customStyle="svgStyling" @clicked="logout()" />
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
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
  components: { VueSvg },
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  #logout-button {
    cursor: pointer;
    background-color: var(--foregroundColor);
    border: 1px solid var(--cardOutline);
    margin: 10px;
    display: flex;
    color: var(--textColor);
    width: 30px;
    min-width: 30px;
    height: 30px;
    border-radius: 30px;
  }

  #logout-button:hover {
    filter: drop-shadow(0px 0px 0.5px var(--textColor));
  }
}

@media screen and (min-width: 800px) {
  #logout-button {
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 40px;
  }
}

@media screen and (min-width: 1200px) {
  #logout-button {
    width: 60px;
    min-width: 60px;
    height: 60px;
    border-radius: 60px;
  }
}
</style>

