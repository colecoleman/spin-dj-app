<template>
  <section>
    <component :is="activeComponent" />
  </section>
</template>

<script>
import Home from "./AdminDashboardGroups/AdminDashboardHome.vue";
import Library from "./AdminDashboardGroups/AdminDashboardPlaylists.vue";

export default {
  computed: {
    activeComponent() {
      return this.$router.currentRoute.value.name;
    },
  },
  components: {
    dashboard: Home,
    library: Library,
  },
};
</script>

<style scoped>
@media screen and (min-width: 320px) {
  section {
    width: 100%;
    /* height: 100%; */
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(4, 360px);
    gap: 10px;
    padding-bottom: 70px;
  }
}
@media screen and (min-width: 800px) {
  section {
    padding: 0;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: minmax(250px, 500px) 350px 350px;
    margin-bottom: 10px;
  }
  #navigation {
    grid-column: 1/3;
  }
}
@media screen and (min-width: 1000px) {
  section {
    height: 100%;
    grid-template-columns: 80px minmax(0, 1fr) 350px;
    grid-template-rows: 50% 1fr;
  }

  #navigation {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
}
@media screen and (min-width: 1200px) {
  section {
    /* grid-template-columns: minmax(0, 100px) minmax(0, 1fr) 30%; */
    grid-template-rows: 50% 1fr;
  }
}
</style>
