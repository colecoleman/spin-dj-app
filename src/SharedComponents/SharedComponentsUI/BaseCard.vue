<template>
  <div class="card" :style="cssVars">
    <div id="heading">
      <img :src="icon" alt="" />
      <slot name="icon"></slot>
      <h3>
        <slot name="title"></slot>
      </h3>
      <div class="right-top">
        <img :src="actionIcon" alt="" />
        <slot name="action1" class="right-top"></slot>
      </div>
    </div>
    <div id="content">
      <slot name="content"></slot>
    </div>
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
  props: ["icon", "actionIcon"],
};
</script>

<style scoped>
@media print {
  #content,
  .card {
    display: block !important;
    position: relative !important;
    width: auto !important;
    height: auto !important;
    overflow: visible !important;
    margin-left: 0 !important;
  }
  #heading {
    visibility: hidden;
  }
}

.card {
  border: 1px solid var(--cardOutline);
  border-radius: 25px;
  background-color: var(--foregroundColor);
  align-items: stretch;
  width: calc(100% - 40px);
  max-width: calc(100% - 80px);
  height: calc(100% - 60px);
  padding: 20px 30px;
  margin: 10px;
}
img {
  width: 14px;
  height: 14px;
  fill: white;
  color: white;
}
#content {
  padding: 0 10px 0 10px;
  height: 90%;
  display: inherit;
}

#heading {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-transform: uppercase;
  font-size: 13px;
  margin-bottom: 10px;
}

h3 {
  font-size: 10pt;
  margin: 0 0 0 10px;
}

.right-top {
  margin-left: auto;
  display: flex;
}
</style>