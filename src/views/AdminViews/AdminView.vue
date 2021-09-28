<template>
  <the-header></the-header>
  <div class="content-container">
    <router-view name="content"></router-view>
  </div>
</template>

<script>
import TheHeader from "../../SharedComponents/SharedComponentsHeader/TheHeader.vue";
export default {
  components: { TheHeader },
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