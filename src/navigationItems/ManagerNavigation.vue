<template>
  <h3>
    <router-link to="/events" :style="{ color: brandingPreferences.textColor }"
      >Events</router-link
    >
  </h3>
  <h3>
    <router-link to="/sales" :style="{ color: brandingPreferences.textColor }"
      >Sales</router-link
    >
  </h3>
</template>

<script>
export default {
  computed: {
    brandingPreferences() {
      return this.$store.state.businessSettings.brandingPreferences;
    },
  },
};
</script>

<style scoped>
h3 {
  /* color: white; */
  text-align: right;
  height: 90%;
  width: 100%;
  padding: 0;
}

li {
  line-height: 3.25;
  width: 100%;
  text-transform: uppercase;
  font-size: 12pt;
  list-style: none;
  font-family: Montserrat, arial, sans-serif;
  font-weight: 600;
}


</style>