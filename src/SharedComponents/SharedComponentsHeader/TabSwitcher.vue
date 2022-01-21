<template>
  <div id="tabs">
    <router-link to="/admin/dashboard">
      <img :src="SVGs.ToolboxSVG" alt="" />
    </router-link>
    <router-link to="/admin/contacts">
      <img :src="SVGs.GroupPeopleSVG" alt="" />
    </router-link>
    <router-link to="/admin/config">
      <img :src="SVGs.WrenchGearSVG" alt="" />
    </router-link>
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
img {
  flex: 1;
  width: 25px;
  height: 100%;
}

img:hover {
  filter: drop-shadow(0px 0px 0.5px var(--textColor));
}

.active-link {
  color: var(--highlightColor);
}
</style>