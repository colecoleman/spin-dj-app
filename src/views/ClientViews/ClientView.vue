<template>
  <non-admin-header></non-admin-header>
  <div class="content-container" v-if="loaded">
    <router-view name="content"></router-view>
  </div>
</template>

<script>
import NonAdminHeader from "../../SharedComponents/SharedComponentsHeader/NonAdminHeader.vue";
export default {
  data() {
    return {
      loaded: false,
    };
  },
  components: { NonAdminHeader },
  async created() {
    if (!this.$store.state.user) {
      await this.$store.dispatch("setUser");
    }
    await this.$store.dispatch("getPublicSettings");
    this.loaded = true;
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