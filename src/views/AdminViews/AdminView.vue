<template>
  <admin-header></admin-header>
  <div class="content-container">
    <router-view name="content"></router-view>
  </div>
</template>

<script>
import AdminHeader from "../../SharedComponents/SharedComponentsHeader/AdminHeader.vue";
export default {
  components: { AdminHeader },
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