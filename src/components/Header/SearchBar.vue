<template>
  <div id="search-bar-container" :style="cssVars">
    <input type="text" placeholder="Search..." :style="cssVars" />
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
    textColor() {
      return this.$store.state.businessSettings.brandingPreferences.textColor;
    },
    cssVars() {
      return {
        "--cardOutline": this.cardOutline,
        "--foregroundColor": this.foregroundColor,
        "--textcolor": this.textColor,
      };
    },
  },
};
</script>

<style scoped>
#search-bar-container {
  background-color: var(--foregroundColor);
  border: 1px solid var(--cardOutline);
  border-radius: 25px;
  height: 100%;
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
input {
  width: 90%;
  color: var(--textcolor);
  background: none;
  border: none;
  font-family: montserrat, sans-serif;
  font-weight: 600;
  font-size: 1em;
  opacity: 1;
}
input:focus {
  outline: none;
  /* color: white; */
}

input::placeholder {
  opacity: 1;
}
</style>