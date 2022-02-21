<template>
  <div id="dashboard-button" @mousedown.prevent="">
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
@media screen and (min-width: 320px) {
  #dashboard-button {
    cursor: pointer;
    background-color: var(--foregroundColor);
    border: 1px solid var(--cardOutline);
    margin: 10px;
    display: flex;
    width: 30px;
    min-width: 30px;
    height: 30px;
    border-radius: 30px;
  }

  #dashboard-button:hover {
    filter: drop-shadow(0px 0px 0.5px var(--textColor));
  }

  img {
    cursor: pointer;
    width: 15px;
    height: 35%;
    margin: 32.5%;
  }
}

@media screen and (min-width: 800px) {
  #dashboard-button {
    width: 40px;
    min-width: 40px;
    height: 40px;
    border-radius: 40px;
  }
}

@media screen and (min-width: 1200px) {
  img {
    width: auto;
  }
  #dashboard-button {
    width: 60px;
    min-width: 60px;
    height: 60px;
    border-radius: 60px;
  }
}
</style>

