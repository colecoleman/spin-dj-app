<template>
  <div class="card" :style="cssVars">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    foregroundColor() {
      return this.$store.state.businessSettings.brandingPreferences
        .foregroundColor;
    },
    cardOutline() {
      return this.$store.state.businessSettings.brandingPreferences.cardOutline;
    },
    cssVars() {
      return {
        "--cardOutline": this.cardOutline,
        "--foregroundColor": this.foregroundColor,
      };
    },
  },
};
</script>

<style scoped>
.card {
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  border-radius: 25px;
  align-items: stretch;
  width: calc(100% - 40px);
  max-width: calc(100% - 80px);
  height: calc(100% - 60px);
  padding: 20px 30px;
  margin: 10px;
}
</style>