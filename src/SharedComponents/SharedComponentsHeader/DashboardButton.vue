<template>
  <div id="notification-button" @mousedown.prevent="">
    <img :src="SVGs.HomeSVG" alt="" @click="dashboard()" />
  </div>
</template>

<script>
import SVGs from "../../assets/SVGs/svgIndex.js";

export default {
  data() {
    return {
      SVGs,
    };
  },
  methods: {
    async dashboard() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#notification-button {
  cursor: pointer;
  max-width: 60px;
  min-width: 60px;
  height: 60px;
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  border-radius: 50px;
  margin: 10px;
}

#notification-button:hover {
  filter: drop-shadow(0px 0px 0.5px var(--textColor));
}

img {
  height: 35%;
  width: 35%;
  margin: 32.5%;
  cursor: pointer;
}
</style>

