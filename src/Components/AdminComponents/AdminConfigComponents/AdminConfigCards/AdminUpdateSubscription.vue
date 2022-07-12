<template>
  <div></div>
</template>
<script>
export default {
  async created() {
    this.$store.dispatch("stripeCreatePortal");
  },
};
</script>
