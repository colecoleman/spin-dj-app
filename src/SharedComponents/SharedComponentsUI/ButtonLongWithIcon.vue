<template>
  <div class="button-long-with-icon" :style="cssVars">
    <h5>{{ text }}</h5>
    <slot name="icon" id="svg"></slot>
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
        "--textColor": this.textColor,
      };
    },
  },
  props: ["text", "icon"],
};
</script>

<style scoped>
.button-long-with-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-transform: uppercase;
  margin: 40px 10px;
  border: 1px solid var(--textColor);
  border-radius: 7px;
}

.button-long-with-icon:hover {
  background-color: gray;
}

.button-long-with-icon:active {
  background: var(--foregroundColor);
  color: black;
}
.button-long-with-icon:active > svg {
  fill: black;
}

h5 {
  margin: 10px;
}
</style>