<template>
  <div class="vendor-wrapper">
    <div class="header-wrapper">
      <non-admin-header />
    </div>
    <div class="content-container">
      <router-view name="content"></router-view>
    </div>
  </div>
</template>

<script>
import NonAdminHeader from "../../Components/SharedComponentsHeader/NonAdminHeader.vue";
export default {
  components: { NonAdminHeader },
  async created() {
    if (!this.$store.state.user) {
      await this.$store.dispatch("setUser");
    }
    await this.$store.dispatch("getTenants");
    if (this.$store.state.businessSettings.identity.businessName) {
      document.title = this.$store.state.businessSettings.identity.businessName;
    } else {
      document.title = "SPIN";
    }
    // await this.$store.dispatch("getPublicSettings");
    this.loaded = true;
  },
};
</script>

<style scoped>
@media screen {
  .vendor-wrapper {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow: scroll;
    overflow-x: hidden;
  }
  .header-wrapper {
    padding-bottom: 20px;
  }
  .content-container {
    height: calc(100% - 80px);
  }
}

@media print {
  .vendor-wrapper {
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