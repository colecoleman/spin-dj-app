<template>
  <the-header></the-header>
  <router-view name="content"></router-view>
</template>

<script>
import TheHeader from "../../SharedComponents/SharedComponentsHeader/TheHeader.vue";
export default {
  components: { TheHeader },
};
</script>

<style>
</style>