<template>
  <div id="tabs">
    <router-link to="/admin/dashboard">
      <vue-svg svg="toolbox" :customStyle="svgStyling" />
    </router-link>
    <router-link to="/admin/contacts">
      <vue-svg svg="group-people" :customStyle="svgStyling" />
    </router-link>
    <router-link to="/admin/config">
      <vue-svg svg="wrench-gear" :customStyle="svgStyling" />
    </router-link>
  </div>
</template>
<script>
import VueSvg from "../../assets/VueSvg.vue";

export default {
  data() {
    return {
      svgStyling: "width: 20px; height: 20px; margin: auto;",
    };
  },
  components: { VueSvg },
};
</script>

<style scoped>
#tabs {
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  border-radius: 25px;
  height: 100%;
  width: 400px;
  padding-right: 10px;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

@media screen and (min-width: 575px) {
  #tabs {
    width: 200px;
  }
}

@media screen and (min-width: 1200px) {
  #tabs {
    width: 400px;
  }
}
</style>