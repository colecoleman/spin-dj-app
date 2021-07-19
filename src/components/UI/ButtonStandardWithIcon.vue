<template>
  <div class="button-standard-with-icon" :style="cssVars">
    <h5>{{ text }}</h5>
    <img v-if="icon" :src="icon" alt="" />
  </div>
</template>

<script>
export default {
  computed: {
    foregroundColor() {
      return this.$store.state.businessSettings.brandingPreferences
        .foregroundColor;
    },
    backgroundColor() {
      return this.$store.state.businessSettings.brandingPreferences
        .backgroundColor;
    },
    textColor() {
      return this.$store.state.businessSettings.brandingPreferences.textColor;
    },
    cssVars() {
      return {
        "--textcolor": this.textColor,
        "--backgroundColor": this.backgroundColor,
        "--foregroundColor": this.foregroundColor,
      };
    },
  },
  props: ["text", "icon"],
};
</script>

<style scoped>
.button-standard-with-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  margin: 10px;
  padding: 5px 15px 5px 5px;
  border: 1px solid var(--textcolor);
  border-radius: 7px;
}

.button-standard-with-icon:hover {
  background-color: gray;
}

.button-standard-with-icon:active {
  filter: invert(100%);
}

img {
  height: 15px;
  width: 15px;
}

h5 {
  margin: 10px;
}
</style>