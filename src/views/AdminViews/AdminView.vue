<template>
  <Amplify-Authenticator>
    <admin-header></admin-header>
    <div class="content-container">
      <router-view name="content"></router-view>
    </div>
  </Amplify-Authenticator>
</template>

<script>
import AdminHeader from "../../SharedComponents/SharedComponentsHeader/AdminHeader.vue";

export default {
  components: { AdminHeader },
  async created() {
    if (!this.$store.state.user) {
      await this.$store.dispatch("setUser");
    }

    await this.$store.dispatch("getAdminEvents");
    await this.$store.dispatch("setBusinessSettings");
    await this.$store.dispatch("getAdminUsers");
    await this.$store.dispatch("getLocations");
  },
};
</script>

<style scoped>
.content-container {
  height: calc(100% - 130px);
  display: flex;
  width: calc(100% - 40px);
  padding: 20px;
}
</style>