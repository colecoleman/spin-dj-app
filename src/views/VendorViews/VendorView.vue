<template>
  <client-header></client-header>
  <div class="content-container">
    <router-view name="content"></router-view>
  </div>
</template>

<script>
import ClientHeader from "./ClientHeader.vue";
export default {
  components: { ClientHeader },
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