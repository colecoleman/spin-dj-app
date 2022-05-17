<template>
  <div class="admin-wrapper">
    <div class="header-wrapper">
      <admin-header />
    </div>
    <div class="content-wrapper" v-if="loaded">
      <router-view name="content"></router-view>
    </div>
  </div>
</template>

<script>
import AdminHeader from "../../SharedComponents/SharedComponentsHeader/AdminHeader.vue";

export default {
  data() {
    return {
      loaded: false,
    };
  },
  components: { AdminHeader },
  async created() {
    if (!this.$store.state.user) {
      await this.$store.dispatch("setUser");
    }
    await this.$store.dispatch("setBusinessSettings");
    await this.$store.dispatch("getAdminUsers");
    this.loaded = true;
    // await this.$store.dispatch("getLocations");
  },
};
</script>

<style scoped>
@media screen {
  .admin-wrapper {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow: scroll;
    overflow-x: hidden;
  }
  .header-wrapper {
    padding-bottom: 20px;
    z-index: 10;
  }
  .content-wrapper {
    z-index: 9;
    height: calc(100% - 80px);
  }
}

@media print {
  .admin-wrapper {
    overflow: visible !important;
    width: unset;
    height: auto;
    padding: 0px;
    box-sizing: unset;
    overflow-x: unset;
    display: block;
  }
  .header-wrapper {
    display: none;
  }
  .content-wrapper {
    overflow: visible !important;
    height: auto;
    display: block;
  }
}
</style>