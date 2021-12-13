<template>
  <non-admin-header></non-admin-header>
  <div class="content-container">
    <router-view name="content"></router-view>
  </div>
</template>

<script>
import NonAdminHeader from "../../SharedComponents/SharedComponentsHeader/NonAdminHeader.vue";
export default {
  components: { NonAdminHeader },
  created() {
    this.$store.dispatch("getPublicSettings");
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